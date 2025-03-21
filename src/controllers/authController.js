const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const redis = require("../config/redisClient");

//Generate Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};
// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    //Create user directly (Our MongoDB schema will hash password automatically)
    user = new User({
      name,
      email,
      password,  
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

//User login logic 
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Double-check password before hashing
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Ensures we have a Validated password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Logic to generate JWT token
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

// Logout User
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
