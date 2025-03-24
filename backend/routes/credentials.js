const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { User, sequelize } = require("../models"); // Ensure the User model is properly set up
const { generateToken, setAuthCookie, verifyPassword, hashPassword } = require("../services/auth"); // Fix hashPassword import
require('dotenv').config();


async function loginUser (req, res) {
  try {
    const { username, password } = req.body;
    // Ensure both fields are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    }
    const isMatch = await verifyPassword(password, user.password_hash);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
    }
    // Generate JWT and set cookie
    const token = generateToken(user);
    setAuthCookie(res, token);
    res.status(200).json({ message: "Login successful.", token, id: user.id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function registerUser (req, res) {
  try {
    const { full_name, email, phone, username, password } = req.body;
    // Check required fields
    // Check if required fields are present
    if (!full_name || !email || !username || !password) {
      const missingFields = [];
      if (!full_name) missingFields.push('Full name');
      if (!email) missingFields.push('Email');
      if (!username) missingFields.push('Username');
      if (!password) missingFields.push('Password');

      return res.status(400).json({
        message: `${missingFields.join(', ')} ${missingFields.length > 1 ? 'are' : 'is'} required`,
      });
    }
    // Build the condition dynamically based on whether the phone number is provided
    const whereCondition = {
      [Op.or]: [{ email }, { username }]
    };
    if (phone) {
      whereCondition[Op.or].push({ phone });
    }
    // Check if email, phone, or username already exists
    const existingUser = await User.findOne({
      where: whereCondition,
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email is already in use." });
      } else if (existingUser.phone === phone) {
        return res.status(400).json({ message: "Phone number is already in use." });
      } else if (existingUser.username === username) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }
    // Hash password
    const password_hash = await hashPassword(password); // Use the hashPassword function
    // Create new user
    const newUser = await User.create({
      full_name,
      email,
      phone: phone || null, // Allows null if phone is optional
      username,
      password_hash: password_hash, // Store the hashed password in password_hash field
    });
    res.status(201).json({ message: "User registered successfully. Please log in." } );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

// Login route
router.post("/login", loginUser);
// Register route
router.post("/register", registerUser);

;

module.exports = router;