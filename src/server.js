const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require('./config/db'); // Import DB connection

const app = express();

// Enable CORS with specific settings
app.use(
  cors({
    origin: ["http://localhost:5000", "https://yourfrontenddomain.com"], // Allow these origins
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies/auth headers
  })
);

// Middleware
app.use(cors()); // Ensure cors is enabled
app.use(express.json()); // Ensure body parsing is enabled
app.use("/api/auth", authRoutes); // Mount the routes

// Connect to DB
dotenv.config();
connectDB();


app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));