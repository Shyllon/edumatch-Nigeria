const jwt = require("jsonwebtoken");
const User = require("../models/user"); 

// Protect Routes (Check Token)
exports.protect = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    token = token.split(" ")[1]; // Extract actual token

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Admin Middleware (Restrict to Admins)
exports.admin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
