const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const redis = require("../config/redisClient");

// ✅ Generate Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

// 📌 Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password.trim(), 10);

    // Create and save user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    res.status(201).json({
      message: "User registered successfully. Please log in.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Debugging Logs
    console.log("User found:", user);

    // Validate password
    const isPasswordValid = await bcryptjs.compare(password.trim(), user.password);

    console.log("Password from request:", password.trim());
    console.log("Hashed password from DB:", user.password);
    console.log("Password match:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Logout User
exports.logoutUser = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "No token provided" });

    // Blacklist token using Redis
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expiry = decoded.exp - Math.floor(Date.now() / 1000);

    await redis.set(token, "blacklisted", "EX", expiry);

    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
