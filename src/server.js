const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS with specific settings
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourfrontenddomain.com"], // Allow these origins
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies/auth headers
  })
);

// Middleware
app.use(express.json());

// Connect to DB
connectDB();


app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));