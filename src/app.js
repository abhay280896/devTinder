// src/app.js
const express = require("express");
const { User } = require("./models/user");
const app = express();

app.use(express.json());

// ✅ signup route
app.post("/signup", async (req, res) => {
  try {
    console.log("request body", req.body);
    const user = new User(req.body);
    const resp = await user.save();
    res.status(201).json({
      message: "User added successfully",
      user: resp,
    });
  } catch (error) {
    console.error("Error while saving user:", error.message);
    res.status(500).json({
      error: "Failed to save user",
      details: error.message,
    });
  }
});

// ✅ get users route
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const transformed = users.map((user) => ({
      id: user._id.toString(),
      ...user._doc,
    }));
    res.status(200).json(transformed);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users",
      details: error.message,
    });
  }
});

module.exports = app;
