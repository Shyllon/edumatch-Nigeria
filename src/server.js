const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require('./config/db'); 

const app = express();

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Enable CORS for local development
app.use(
  cors({
    origin: [
      "https://edumatch-ashen.vercel.app",
      "https://edumatch-afolabis-projects-1aa36ae8.vercel.app",
      "http://localhost:3000"
    ],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use("/api/auth", authRoutes); // Mount authentication routes

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
