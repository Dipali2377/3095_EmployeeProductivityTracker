import mongoose from "mongoose";
import express from "express";
import User from "../models/User.js";

const authRoutes = express.Router();

// Signup route
authRoutes.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user if they don't exist
    const newUser = new User({
      name,
      username,
      password,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully. Please log in." });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});

// Login route
authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    }

    console.log({ user });
    // Validate the password
    const isMatch = await user.comparePassword(password);

    console.log({ isMatch });
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If login is successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export { authRoutes };
