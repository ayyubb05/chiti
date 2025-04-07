// Import the necessary controller functions

// Import info functions
const {
  getUserGroups,
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
  deleteGroup,
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

// Import cycle functions
const {
  startCycle,
  getCycleInfo,
  createGroupCycle,
} = require("./group/cycle.group");


// Export all controller functions
const controller = {
  getUserGroups,
  getGroupById,
  getPublicGroups,

  getMembers,
  submitJoinRequest,
  cancelJoinRequest,
  leaveGroup,

  createGroup,
  deleteGroup,
  getActiveJoinRequests,
  updateJoinRequestStatus,
  removeMember,
  updateGroupSettings,

  getGroupFinance,
  updateGroupFinance,

  getGroupChat,
  postGroupChatMessage,

  startCycle,
  getCycleInfo,
  createGroupCycle,

};

module.exports = controller;
