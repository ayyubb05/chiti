// Import necessary models
const { Group, User, JoinRequest, GroupMember, sequelize } = require('../../models');
const { Op } = require('sequelize');

////
// Group Information & Discovery
////

// Fetch all groups (public and/or private groups user is part of)
async function getAllGroups(req, res) {
  const userId = req.user.id;

  try {
    const groups = await Group.findAll({
      include: [
        {
          model: GroupMember,
          where: { user_id: userId },
          required: false, // Include groups user is in AND public groups
        }
      ],
      where: {
        [Op.or]: [
          { visibility: 'public' },  // Public groups
          { '$GroupMembers.user_id$': userId } // Private groups user is in
        ]
      },
      attributes: [
        'id', 
        'name', 
        'description', 
        'visibility', 
        'monthly_fee', 
        'payment_deadline', 
        'group_size', 
        'payout_day', 
        'admin_id', 
        'created_at'
      ]
    });

    return res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Fetch detailed info about a specific group
async function getGroupById(req, res) {
  const { group_id } = req.params;
  const userId = req.user.id;

  try {
    const group = await Group.findOne({
      where: { id: group_id },
      include: [
        {
          model: GroupMember,
          where: { user_id: userId },
          required: false // Allow fetching public groups or groups user is part of
        }
      ],
      attributes: [
        'id',
        'name',
        'description',
        'visibility',
        'monthly_fee',
        'payment_deadline',
        'group_size',
        'payout_day',
        'admin_id',
        'created_at'
      ]
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found or access denied." });
    }

    return res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPublicGroups(req, res) {
  try {
    const publicGroups = await Group.findAll({
      where: { visibility: 'public' },
      attributes: [
        'id', 
        'name', 
        'description', 
        'monthly_fee', 
        'payment_deadline', 
        'group_size', 
        'payout_day', 
        'admin_id', 
        'created_at'
      ]
    });

    return res.json(publicGroups);
  } catch (error) {
    console.error("Error fetching public groups:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
  getAllGroups,
  getGroupById,
  getPublicGroups,
};