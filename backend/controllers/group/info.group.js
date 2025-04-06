const { Group, User, JoinRequest, GroupMember, sequelize } = require('../../models');
const { Op } = require('sequelize');

////
// Group Information & Discovery
////

async function getGroups(req, res, condition) {
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
        ...condition // ✅ Fix: Spread condition here
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

    // Fetch member count for each group and append to objects
    const groupsWithMemberCount = await Promise.all(groups.map(async (group) => {
      const member_count = await GroupMember.count({
        where: { group_id: group.id }
      });
      return { ...group.toJSON(), member_count };
    }));

    return res.status(200).json(groupsWithMemberCount);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


// Fetch all groups (public and/or private groups user is part of)
async function getUserGroups(req, res) {
  const userId = req.user.id;
  const condition = { '$GroupMembers.user_id$': userId };
  return getGroups(req, res, condition);
}


async function getPublicGroups(req, res) {
  const userId = req.user.id;
  const condition = {
    [Op.or]: [
      { visibility: 'public' },
      { '$GroupMembers.user_id$': userId }
    ]
  };
  return getGroups(req, res, condition);
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
          required: false
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

module.exports = {
  getUserGroups,
  getGroupById,
  getPublicGroups,
};