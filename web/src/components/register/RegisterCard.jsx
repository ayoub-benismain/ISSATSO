import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function RegisterCard() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength from 0 to 5
  function getPasswordStrength(pwd) {
    let strength = 0;
    const regexes = [
      /[a-z]/, // lowercase
      /[A-Z]/, // uppercase
      /[0-9]/, // digit
      /[^A-Za-z0-9]/, // special char
    ];
    regexes.forEach((regex) => {
      if (regex.test(pwd)) strength += 1;
    });
    if (pwd.length >= 8) strength += 1;
    return strength;
  }

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordStrength(getPasswordStrength(val));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email.");
    if (!username) return toast.error("Username required.");
    if (passwordStrength < 4) {
      return toast.error(
        "Password is too weak. Use uppercase, lowercase, number, symbol, and at least 8 characters."
      );
    }

    setLoading(true);
    toast.loading("Registering...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await res.json();

      // Wait 2 seconds to simulate loading
      await new Promise((r) => setTimeout(r, 2000));

      toast.dismiss();

      if (!res.ok) {
        toast.error(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      const time = new Date().toLocaleTimeString();
      toast.success(`Account created successfully at ${time}! You can now login.`);

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1000);
    } catch (err) {
      toast.dismiss();
      toast.error("Server error, try again.");
      console.error("Register error:", err);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
      className="flex-1 flex items-center justify-center px-6 py-10 lg:px-20"
    >
      <div className="bg-white rounded-xl shadow-xl p-8 lg:p-10 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create your account
        </h2>

        {/* Panda Face */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <div className="absolute w-full h-full bg-black rounded-full" />
            <div className="absolute top-6 left-5 w-4 h-4 rounded-full bg-white">
              {showPassword ? (
                <div className="w-full h-0.5 bg-black mt-1" />
              ) : (
                <div className="w-2 h-2 bg-black rounded-full m-auto mt-1" />
              )}
            </div>
            <div className="absolute top-6 right-5 w-4 h-4 rounded-full bg-white">
              {showPassword ? (
                <div className="w-full h-0.5 bg-black mt-1" />
              ) : (
                <div className="w-2 h-2 bg-black rounded-full m-auto mt-1" />
              )}
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="flex justify-center gap-6 mb-6">
          {["student", "teacher"].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={type}
                checked={role === type}
                onChange={() => setRole(type)}
                className="accent-blue-600 w-4 h-4"
                disabled={loading}
              />
              <span
                className={`font-medium text-gray-700 capitalize ${
                  role === type ? "text-blue-600" : ""
                }`}
              >
                I’m a {type}
              </span>
            </label>
          ))}
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ayoub@issatso.tn"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ayoub"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Strength Bar */}
            <div className="h-2 rounded mt-2 w-full bg-gray-300">
              <div
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                className={`h-2 rounded transition-all duration-300 ${
                  passwordStrength <= 2
                    ? "bg-red-500"
                    : passwordStrength === 3
                    ? "bg-yellow-400"
                    : passwordStrength >= 4
                    ? "bg-green-500"
                    : ""
                }`}
              />
            </div>
            <p className="text-sm mt-1 text-gray-700">
              Password strength:{" "}
              {passwordStrength <= 2 ? "Weak" : passwordStrength === 3 ? "Medium" : "Strong"}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
