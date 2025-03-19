const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({ message: "User profile", user: req.user });
});

router.get("/admin", protect, admin, (req, res) => {
  res.json({ message: "Admin dashboard" });
});

module.exports = router;
