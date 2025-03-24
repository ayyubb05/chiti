// Import the necessary models
const { Group, User, JoinRequest, GroupMember } = require('../../models');

////
// Security & Account Settings
////


// Change password
async function updatePassword(req, res) {
  try {
    const user_id = req.user.id;
    const { current_password, new_password } = req.body;

    // Validate input
    if (!current_password || !new_password) {
      return res.status(400).json({ message: "Both fields are required" });
    }

    // Fetch user password hash
    const user = await User.findOne({ where: { id: user_id }, attributes: ["password_hash"] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password is correct
    const isMatch = await verifyPassword(current_password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password and update
    const hashed_password = await hashPassword(new_password);
    await User.update(
      { password_hash: hashed_password, updated_at: sequelize.fn("NOW") },
      { where: { id: user_id } }
    );

    res.status(201).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Deactivate account
async function deactivateAccount(req, res) {};


module.exports = {
  updatePassword,
  deactivateAccount,
};
