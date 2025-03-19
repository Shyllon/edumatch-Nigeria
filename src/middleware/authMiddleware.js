const jwt = require("jsonwebtoken");
const User = require("./models/User");
const redis = require("../config/redisClient"); // Import Redis client

// Protect Routes (Check Token & Blacklist)
exports.protect = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    token = token.split(" ")[1]; // Extract actual token

    // Check if token is blacklisted
    const isBlacklisted = await redis.get(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token has been revoked" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin Middleware (Restrict to Admins)
exports.admin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
