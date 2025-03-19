const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Log in user
router.post("/logout", logoutUser); // Log out user

module.exports = router;
