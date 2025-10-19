const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const sendEmail = require("../utils/sendEmail");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Format date to MySQL datetime
function toMySQLDatetime(date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

// Generate access token (now includes full user info)
const generateAccessToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

// Generate refresh token
const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

// ============================
// REGISTER
// ============================
exports.register = (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const validRoles = ["student", "teacher"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role selected." });
  }

  db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already in use." });
    }

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        return res.status(500).json({ message: "Server error." });
      }

      db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, role],
        (insertErr) => {
          if (insertErr) {
            return res.status(500).json({ message: "Server error." });
          }

          res.status(201).json({ message: "User registered successfully." });
        }
      );
    });
  });
};

// ============================
// LOGIN
// ============================
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (compareErr, isMatch) => {
      if (compareErr) {
        return res.status(500).json({ message: "Server error." });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Set refresh token cookie (httpOnly)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Send only token
      res.json({ token: accessToken });
    });
  });
};

// ============================
// REFRESH TOKEN
// ============================
exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token provided." });
  }

  jwt.verify(token, JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, results) => {
      if (err || results.length === 0) {
        return res.status(403).json({ message: "User not found." });
      }

      const user = results[0];
      const newAccessToken = generateAccessToken(user);

      res.json({ token: newAccessToken });
    });
  });
};

// ============================
// FORGOT PASSWORD
// ============================
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error." });
    if (results.length === 0) return res.status(404).json({ message: "Email not found." });

    const user = results[0];
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    console.log("Reset token:", resetToken);
    console.log("Reset token expiry:", resetTokenExpiry);

    console.log("Updating reset token for user:", user.id);


    db.query(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?",
      [resetToken, resetTokenExpiry, user.id],
      (updateErr) => {
        if (updateErr) return res.status(500).json({ message: "Server error." });

        const resetLink = `${FRONTEND_URL}/auth/reset-password/${resetToken}`;
        const subject = "Password Reset Request";
        const html = `
          <p>Hello ${user.username},</p>
          <p>You requested a password reset. Click the link below:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>This link is valid for 1 hour.</p>
        `;

        sendEmail(user.email, subject, html)
          .then(() => res.json({ message: "Password reset email sent." }))
          .catch(() => res.status(500).json({ message: "Failed to send email." }));
      }
    );
  });
};

// ============================
// RESET PASSWORD
// ============================
exports.resetPassword = (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required." });
  }

  const now = toMySQLDatetime(new Date());

  db.query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?",
    [resetToken, now],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error." });
      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid or expired reset token." });
      }

      const user = results[0];

      bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
        if (hashErr) return res.status(500).json({ message: "Error hashing password." });

        db.query(
          "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
          [hashedPassword, user.id],
          (updateErr) => {
            if (updateErr) return res.status(500).json({ message: "Failed to update password." });

            res.json({ message: "Password has been reset successfully." });
          }
        );
      });
    }
  );
};

// ============================
// LOGOUT
// ============================
exports.logout = (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: "Lax",
  });

  // Optionally, you can also do server-side cleanup if needed

  res.json({ message: "Logged out successfully." });
};
