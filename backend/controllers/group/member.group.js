// Import necessary models
const { Group, User, JoinRequest, GroupMember, sequelize } = require('../../models');

////
// Membership Management
////

async function getMembers(req, res) {
  const { group_id } = req.params;

  try {
    // Find all members of the group, including user details
    const members = await GroupMember.findAll({
      where: { group_id: group_id },
      attributes: ["group_id", "user_id"],
      include: [
        {
          model: User,
          attributes: ["id", "username"], // Include user details
        },
        {
          model: Group,
          attributes: ["id", "name"], // Include group details
        },
      ],
    });

    // Properly check if no members exist
    if (members.length === 0) {
      return res.status(404).json({ error: "No members found in this group." });
    }

    return res.status(200).json({ members });
  } catch (error) {
    console.error("Error fetching group members:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
} 

// Submit a join request
async function submitJoinRequest(req, res) {
  const { group_id } = req.params;
  const user_id = req.user.id;

  try {
    // Check if the group exists
    const group = await Group.findByPk(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    // Check if the user is already a member
    const existing_membership = await GroupMember.findOne({
      where: { group_id, user_id }
    });
    if (existing_membership) {
      return res.status(400).json({ error: "You are already a member of this group." });
    }

    // Check if a pending join request already exists
    const existing_request = await JoinRequest.findOne({
      where: { group_id, user_id, status: 'pending' }
    });
    if (existing_request) {
      return res.status(400).json({ error: "A pending join request already exists." });
    }

    // Create new join request
    const join_request = await JoinRequest.create({
      group_id,
      user_id,
      status: 'pending'
    });

    return res.status(201).json({ message: "Join request submitted successfully.", join_request });
  } catch (error) {
    console.error("Error submitting join request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Cancel a join request
async function cancelJoinRequest(req, res) {
  const { request_id } = req.params;
  const user_id = req.user.id;

  try {
    const join_request = await JoinRequest.findOne({
      where: { id: request_id, user_id, status: 'pending' }
    });

    if (!join_request) {
      return res.status(404).json({ error: "Join request not found." });
    }

    await join_request.update({ status: 'cancelled' });

    return res.status(200).json({ message: "Join request cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling join request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Leave a group
async function leaveGroup(req, res) {
  const { group_id } = req.params;
  const user_id = req.user.id;

  try {
    const membership = await GroupMember.findOne({
      where: { group_id, user_id }
    });

    if (!membership) {
      return res.status(404).json({ error: "You are not a member of this group." });
    }

    await membership.destroy(); // Remove the user's membership

    return res.status(200).json({ message: "You have successfully left the group." });
  } catch (error) {
    console.error("Error leaving group:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getMembers,
  submitJoinRequest,
  cancelJoinRequest,
  leaveGroup,
};