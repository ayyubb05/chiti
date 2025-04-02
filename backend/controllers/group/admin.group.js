// Import necessary models
const { Group, User, JoinRequest, GroupMember, sequelize } = require('../../models');
const { Op } = require('sequelize');

////
// Admin Controls (Restricted to Group Admins)
////

const group_details = [
  "id",
  "admin_id",
  "name",
  "description",
  "monthly_fee",
  "payment_deadline",
  "group_size",
  "visibility",
  "payout_day",
  "payout_order",
  "chat_enabled",
  "notification_preferences"
];


// Create a new group
async function createGroup(req, res) {
  const admin_id = req.user.id; // Admin ID is based on the user creating the group
  const { name, description, monthly_fee, payment_deadline, group_size, visibility, payout_day, payout_order, chat_enabled, notification_preferences } = req.body;

  try {
    // Create a new group in the database
    const newGroup = await Group.create({
      admin_id, 
      name, 
      description, 
      monthly_fee, 
      payment_deadline, 
      group_size, 
      visibility: visibility || 'private', // Default visibility is private if not provided
      payout_day, 
      payout_order, 
      chat_enabled: chat_enabled || false, // Default chat_enabled to false if not provided
      notification_preferences: notification_preferences || {}
    });

    // Add the user who created the group as a member with the role 'admin'
    await GroupMember.create({
      group_id: newGroup.id,
      user_id: admin_id,
      role: 'admin'
    });

    return res.status(201).json({
      message: "Group created successfully.",
      group: newGroup
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update group details (name, description, etc.)
async function updateGroupSettings(req, res) {
  const { group_id } = req.params;
  const { name, description, monthly_fee, payment_deadline, group_size, visibility, payout_day, payout_order, chat_enabled, notification_preferences } = req.body;

  try {
    // Ensure the group exists
    const group = await Group.findByPk(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    // Update the group settings
    await group.update({
      name,
      description,
      monthly_fee,
      payment_deadline,
      group_size,
      visibility,
      payout_day,
      payout_order,
      chat_enabled,
      notification_preferences
    });

    return res.json({ message: "Group details updated successfully.", group });
  } catch (error) {
    console.error("Error updating group settings:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getActiveJoinRequests(req, res) {
  const admin_id = req.user.id;

  try {
    // Get all groups where the current user is an admin
    const groups = await Group.findAll({
      where: { admin_id: admin_id },
    });

    // Extract group IDs from the groups object
    const group_ids = groups.map(group => group.id);

    // Find the join requests for the groups
    const join_requests = await JoinRequest.findAll({
      where: { 
        group_id: { [Op.in]: group_ids }, 
        status: 'pending' 
      }
    });

    // If no join requests are found, return a 404 error
    if (join_requests.length === 0) {
      return res.status(404).json({ error: "No join requests found." });
    }

    // Return the join requests in the response
    return res.status(200).json({ join_requests });
  } catch (error) {
    console.error("Error fetching join requests:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Approve a join request
async function updateJoinRequestStatus(req, res) {
  const { group_id, request_id } = req.params;
  const { status } = req.body; // Expecting "approved" or "rejected"

  try {
    // Ensure a valid status is provided
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    // Find the join request
    const joinRequest = await JoinRequest.findOne({
      where: { id: request_id, group_id },
    });

    if (!joinRequest) {
      return res.status(404).json({ error: "Join request not found." });
    }

    if (status == "approved") {
      // Add user to the group as a member
      await GroupMember.create({
        group_id,
        user_id: joinRequest.user_id,
        role: 'member'
      });      
    }

    // Update the status
    joinRequest.status = status;
    await joinRequest.save();

    return res.status(200).json({
      message: `Join request ${status} successfully.`,
      join_request: joinRequest,
    });
  } catch (error) {
    console.error("Error updating join request status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Remove a member from the group
async function removeMember(req, res) {
  const { group_id, member_id } = req.params;
  const user_id = req.user.id; // The user making the request

  try {
    // Ensure the group exists
    const group = await Group.findByPk(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    // Ensure the member exists in the group
    const member = await GroupMember.findOne({
      where: { group_id, user_id: member_id }
    });

    if (!member) {
      return res.status(404).json({ error: "Member not found in this group." });
    }

    // Check if the requesting user is the admin
    const groupAdmin = await GroupMember.findOne({
      where: { group_id, user_id, role: "admin" }
    });

    // Permission logic:
    // - User can leave their own membership
    // - Admin can remove other users (but not themselves)
    if (user_id === Number(member_id) || groupAdmin) {
      if (groupAdmin && user_id === Number(member_id)) {
        return res.status(403).json({ error: "Admins cannot remove themselves. Assign a new admin first." });
      }

      await member.destroy();
      return res.status(200).json({ message: user_id === Number(member_id) ? "You have successfully left the group." : "Member removed from the group." });
    }

    return res.status(403).json({ error: "You do not have permission to remove this member." });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteGroup(req, res) {
  const { group_id } = req.params;
  const user_id = req.user.id; // The user making the request

  try {
    // Ensure the group exists
    const group = await Group.findByPk(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    // Check if the requesting user is the admin
    if (group.admin_id !== user_id) {
      return res.status(403).json({ error: "You do not have permission to delete this group." });
    }

    // Delete the group
    await group.destroy();
    return res.status(200).json({ message: "Group deleted successfully." });

  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
  createGroup,
  deleteGroup,
  getActiveJoinRequests,
  updateJoinRequestStatus,
  removeMember,
  updateGroupSettings,
}