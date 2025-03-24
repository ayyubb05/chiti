require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser"); // Required to parse cookies
const cors = require("cors");
const { sequelize } = require("./models"); // Ensure this matches your actual Sequelize instance export

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Enable parsing cookies

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests only from Next.js frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allow cookies (important for JWT auth)
};
app.use(cors(corsOptions));

// Database Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Database connection error:", err));

// Routes
const credRoutes = require("./routes/credentials");
app.use("/api/credentials", credRoutes);

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

const groupRoutes = require("./routes/groups");
app.use("/api/groups", groupRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});


// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;