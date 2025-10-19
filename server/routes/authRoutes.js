const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  logout, 
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logout); 

module.exports = router;
