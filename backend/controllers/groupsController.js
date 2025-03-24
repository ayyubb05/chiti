// Import the necessary controller functions

// Import info functions
const {
  getAllGroups,
  getGroupById,
  getPublicGroups,
} = require("./group/info.group");

// Import member functions
const {
  getMembers,
  submitJoinRequest,
  cancelJoinRequest,
  leaveGroup,
} = require("./group/member.group");

// Import admin functions
const {
  createGroup,
  getActiveJoinRequests,
  updateJoinRequestStatus,
  removeMember,
  updateGroupSettings,
} = require("./group/admin.group");

// Import finances functions
const {
  getGroupFinance,
  updateGroupFinance,
} = require("./group/finances.group");

// Import chat functions
const {
  getGroupChat,
  postGroupChatMessage,
} = require("./group/chat.group");


// Export all controller functions
const controller = {
  getAllGroups,
  getGroupById,
  getPublicGroups,

  getMembers,
  submitJoinRequest,
  cancelJoinRequest,
  leaveGroup,

  createGroup,
  getActiveJoinRequests,
  updateJoinRequestStatus,
  removeMember,
  updateGroupSettings,

  getGroupFinance,
  updateGroupFinance,

  getGroupChat,
  postGroupChatMessage,
};

module.exports = controller;
