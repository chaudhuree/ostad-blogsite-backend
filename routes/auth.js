const express = require("express");

const router = express.Router();

// middlewares
const { authenticated } = require("../middleware/authentication.js");

// controllers
const {
  register,
  login,
  isLoginCheck,
  updateProfile,
} = require("../controllers/auth.js");
router.post("/register", register);
router.post("/login", login);
router.get("/login-check", authenticated, isLoginCheck);

router.put("/profile", authenticated, updateProfile);

module.exports = router;
