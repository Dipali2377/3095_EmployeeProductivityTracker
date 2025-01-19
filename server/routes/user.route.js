import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const userRoutes = express.Router();

// Check if user already exists
userRoutes.get("/check-user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Signup route
userRoutes.post("/signup", async (req, res) => {
  const { username, password, name } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  try {
    // Hash password before saving to the database
    const salt = await bcrypt.genSalt(10);
    console.log({ salt });
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    console.log({ hashedPassword });
    const newUser = new User({
      username,
      password,
      name,
    });

    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export { userRoutes };
