// Import the necessary controller functions

// Import info functions
const {
  getCurrentUser,
  getUserByID,
  updateProfileInfo,
} = require("./profile/info.profile");

// Import group functions
const {
  getUserGroups,
  getUserJoinRequests,
  cancelJoinRequest,
  leaveGroup,
} = require("./profile/group.profile");

// Import finances functions
const {
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getTransactionHistory,
} = require("./profile/finances.profile");

// Import social functions
const {
  getFriendsList,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
} = require("./profile/social.profile");

// Import account functions
const {
  updatePassword,
  deactivateAccount,
} = require("./profile/account.profile");



// Export all controller functions
const controller = {
  getCurrentUser,
  getUserByID,
  updateProfileInfo,

  getUserGroups,
  getUserJoinRequests,
  cancelJoinRequest,
  leaveGroup,

  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getTransactionHistory,

  getFriendsList,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,

  updatePassword,
  deactivateAccount,
};

module.exports = controller;
