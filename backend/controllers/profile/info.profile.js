// Import necessary models
const { Group, User, JoinRequest, GroupMember, sequelize } = require('../../models');

////
// Profile Info
////

// Fetch a user profile by ID (helper function)
async function getUserProfile(user_id) {
  return await User.findOne({
    where: { id: user_id },
    attributes: ["id", "full_name", "email", "username"],
  });
}

// Fetch the profile of the current user
async function getCurrentUser(req, res) {
  try {
    const user = await getUserProfile(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Fetch a single user profile by their ID
async function getUserByID(req, res) {
  try {
    const user = await getUserProfile(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update user profile details
async function updateProfileInfo(req, res) {
  try {
    // Check if the user is trying to update their own profile
    const user_id_token = req.user.id.toString(); // Get ID from the authenticated user
    const user_id_params = req.params.id.toString(); // Get ID from URL params (if applicable)

    if (user_id_params && user_id_token !== user_id_params) {
      return res.status(403).json({ error: "Forbidden" });  // Return 403 for unauthorized updates
    }
    const { full_name, username, email } = req.body;

    // Validate input
    if (!full_name && !username && !email) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    // Update the user profile in the database
    const [updatedRows] = await User.update(
      { full_name, username, email, updated_at: new Date() }, // Use JS Date() for timestamp
      { where: { id: user_id_token } }
    );

    if (updatedRows === 0) {
      return res.status(400).json({ message: "No changes made." });
    }

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getCurrentUser,
  getUserByID,
  updateProfileInfo,
};