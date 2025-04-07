const { Group, GroupMember, sequelize } = require('../../models');
const { Op } = require('sequelize');

// Helper function to fetch groups based on a condition
async function fetchGroups(req, res, condition, isSingleGroup = false) {
  const userId = req.user.id;

  const baseAttributes = [
    'id', 
    'name', 
    'description', 
    'visibility', 
    'monthly_fee', 
    'group_size', 
    'admin_id', 
    'created_at'
  ];

  const baseInclude = [
    {
      model: GroupMember,
      where: { user_id: userId },
      required: false, // Include groups user is in AND public groups
    }
  ];

  try {
    const groups = isSingleGroup
      ? await Group.findOne({
          where: { id: condition.group_id },
          include: baseInclude,
          attributes: baseAttributes
        })
      : await Group.findAll({
          include: baseInclude,
          where: { ...condition },
          attributes: baseAttributes
        });

    if (isSingleGroup && !groups) {
      return res.status(404).json({ error: "Group not found or access denied." });
    }

    // Fetch member count for each group and append to objects
    const groupsWithMemberCount = isSingleGroup
      ? { ...groups.toJSON(), member_count: await getGroupMemberCount(groups.id) }
      : await appendMemberCount(groups);

    return res.status(200).json(groupsWithMemberCount);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Helper function to fetch the member count for a group
async function getGroupMemberCount(groupId) {
  return await GroupMember.count({
    where: { group_id: groupId }
  });
}

// Helper function to append member count to each group
async function appendMemberCount(groups) {
  return Promise.all(groups.map(async (group) => {
    const member_count = await getGroupMemberCount(group.id);
    return { ...group.toJSON(), member_count };
  }));
}

// Fetch all groups user is part of
async function getUserGroups(req, res) {
  const userId = req.user.id;
  const condition = { '$GroupMembers.user_id$': userId };
  return fetchGroups(req, res, condition);
}

// Fetch all groups (public and/or private groups user is part of)
async function getPublicGroups(req, res) {
  const userId = req.user.id;
  const condition = {
    [Op.or]: [
      { visibility: 'public' },
      { '$GroupMembers.user_id$': userId }
    ]
  };
  return fetchGroups(req, res, condition);
}

// Fetch detailed info about a specific group
async function getGroupById(req, res) {
  const { group_id } = req.params;
  return fetchGroups(req, res, { group_id }, true);
}

module.exports = {
  getUserGroups,
  getGroupById,
  getPublicGroups,
};