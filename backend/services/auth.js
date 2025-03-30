const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Group, sequelize } = require('../models');
require('dotenv').config();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Set Authentication Cookie
const setAuthCookie = (res, token) => {
  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict", // Protects against CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Hash Password
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Verify Password
const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Middleware to authenticate user based on the JWT cookie
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Or your secret
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware for verifying if the user is the admin of the group
const authorizeAdmin = async (req, res, next) => {
  const { group_id } = req.params;
  const userId = req.user.id;

  try {
    // Fetch the group and explicitly include admin_id
    const group = await Group.findByPk(group_id, {
      attributes: ["id", "admin_id"], // Ensure admin_id is selected
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    // Check if the authenticated user is the admin of the group
    if (group.admin_id !== userId) {
      return res.status(403).json({ error: "You are not authorized to perform this action." });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while checking admin permissions." });
  }
};
module.exports = {
  authenticateUser,
  authorizeAdmin,
  generateToken,
  setAuthCookie,
  hashPassword,
  verifyPassword,
};