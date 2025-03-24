// Import the necessary models
const { Group, User, JoinRequest, GroupMember } = require('../../models');

////
// Social Features
////


// Fetch user's friends list
async function getFriendsList(req, res) {};

// Send a friend request
async function sendFriendRequest(req, res) {};

// Accept a friend request
async function acceptFriendRequest(req, res) {};

// Remove a friend
async function removeFriend(req, res) {};


module.exports = {
  getFriendsList,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
};