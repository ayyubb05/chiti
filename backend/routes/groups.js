const express = require("express");
const router = express.Router();
const gc = require("../controllers/groupsController");
const { authenticateUser, authorizeAdmin } = require("../services/auth");


////
// Admin Controls (Restricted to Group Admins)
////

// Fetch all join requests
router.get("/join-requests", authenticateUser, gc.getActiveJoinRequests);
// Update join request status (approve/reject)
router.patch("/:group_id/join-requests/:request_id", authenticateUser, authorizeAdmin, gc.updateJoinRequestStatus);
// Remove a member from the group
router.delete("/:group_id/members/:member_id", authenticateUser, gc.removeMember);



// TODO:
// send group invite as admin
// accept join invite by user
// set payout order (waiver-wire/draft -like)


////
// Membership Management
////

router.get("/:group_id/members", authenticateUser, gc.getMembers);
// Submit a join request
router.post("/:group_id/join-requests", authenticateUser, gc.submitJoinRequest);
// Cancel a join request
router.delete("/join-requests/:request_id/cancel", authenticateUser, gc.cancelJoinRequest);



////
// Payment & Financial Management
////

// View group payment details (e.g., next payment date, balance)
router.get("/:group_id/finance", authenticateUser, gc.getGroupFinance);
// Manage group payments (admin only)
router.patch("/:group_id/finance", authenticateUser, authorizeAdmin, gc.updateGroupFinance);


////
// Communication & Chat
////

// Fetch group chat messages
router.get("/:group_id/chat", authenticateUser, gc.getGroupChat);
// Post a new message to group chat
router.post("/:group_id/chat", authenticateUser, gc.postGroupChatMessage);

////
// Group Information & Discovery
////

// Browse public groups
router.get("/public", authenticateUser, gc.getPublicGroups);
// Fetch all groups (public and/or private groups user is part of)
router.get("/", authenticateUser, gc.getUserGroups);
// Create a new group
router.post("/", authenticateUser, gc.createGroup);
// Fetch detailed info about a specific group
router.get("/:group_id", authenticateUser, gc.getGroupById);
// Delete group
router.delete("/:group_id", authenticateUser, authorizeAdmin, gc.deleteGroup);
// Manage group details and visibility (e.g., name, description, rules, visibility)
router.patch("/:group_id", authenticateUser, authorizeAdmin, gc.updateGroupSettings);


module.exports = router;

