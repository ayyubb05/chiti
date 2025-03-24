// Import the necessary models
const { Group, User, JoinRequest, GroupMember } = require('../../models');

////
// Group Management
////

// Fetch all groups the user is a member of
async function getUserGroups(req, res) {
  try {
    const userId = req.user.id; // Get the authenticated user's ID

    // Fetch all groups where the user is a member
    const groups = await Group.findAll({
      include: {
        model: GroupMember,
        where: { user_id: userId },
        attributes: [],
        required: true,
      },
    });

    // Send the groups back to the client
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching user groups:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Fetch the status of all join requests made by the user
async function getUserJoinRequests(req, res) {
  try {
    const userId = req.user.id; // Get the authenticated user's ID

    // Fetch all join requests made by the user
    const joinRequests = await JoinRequest.findAll({
      where: { user_id: userId },
      include: {
        model: Group,
        attributes: ["id", "name"], // Include group name and ID in the response
      },
    });

    // Send the join requests back to the client
    res.status(200).json(joinRequests);
  } catch (error) {
    console.error("Error fetching join requests:", error);
    res.status(500).json({ message: "Server error" });
  }
}



module.exports = {
  getUserGroups,
  getUserJoinRequests,
};