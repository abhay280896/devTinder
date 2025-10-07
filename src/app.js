// src/app.js
const express = require("express");
const { User } = require("./models/user");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// --- Routes ---

// Signup
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const resp = await user.save();

    res.status(201).json({
      message: "User added successfully",
      user: resp,
    });
  } catch (error) {
    console.error("Error saving user:", error.message);
    if (error.code === 11000) {
      // Duplicate email
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Hide passwords
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", details: error.message });
  }
});

module.exports = app;
