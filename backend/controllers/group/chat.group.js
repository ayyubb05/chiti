// Import necessary models
const { Group, User, JoinRequest, GroupMember, sequelize, GroupChatMessage } = require('../../models');

////
// Communication & Chat
////

// Fetch group chat messages
async function getGroupChat(req, res) {
  const { group_id } = req.params;

  try {
    // Ensure the group exists
    const group = await Group.findByPk(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    // Fetch the chat messages for the group
    const messages = await GroupChatMessage.findAll({
      where: { group_id },
      order: [['created_at', 'ASC']], // Assuming 'created_at' field exists to order by date
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'profile_picture'], // Assuming 'username' and 'profile_picture' exist
        },
      ],
    });

    return res.json({ messages });
  } catch (error) {
    console.error("Error fetching group chat messages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Post a new message to group chat
async function postGroupChatMessage(req, res) {
  const { group_id } = req.params;
  const { message } = req.body;
  const user_id = req.user.id; // Assuming authentication middleware sets the user ID

  try {
    // Ensure the group exists
    const group = await Group.findByPk(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    // Ensure the user is a member of the group
    const groupMember = await GroupMember.findOne({
      where: { group_id, user_id },
    });

    if (!groupMember) {
      return res.status(403).json({ error: "You are not a member of this group." });
    }

    // Create a new chat message in the group
    const newMessage = await GroupChatMessage.create({
      group_id,
      user_id,
      message,
    });

    return res.status(201).json({ message: "Message posted successfully.", newMessage });
  } catch (error) {
    console.error("Error posting message:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getGroupChat,
  postGroupChatMessage,
};