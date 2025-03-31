const express = require("express");
const router = express.Router();
const pc = require("../controllers/profileController");
const { authenticateUser } = require("../services/auth");


////
// Group Management
////

// Fetch all groups the user is a member of
router.get("/groups", authenticateUser, pc.getUserGroups);
// Fetch the status of all join requests made by the user
router.get("/join-requests", authenticateUser, pc.getUserJoinRequests);

// TODO:
// add view of active join requests from others for each group of current user



////
// Financial Management
////

// Fetch user's payment methods
router.get("/finance/payment-methods", authenticateUser, pc.getPaymentMethods);
// Add a new payment method
router.post("/finance/payment-methods", authenticateUser, pc.addPaymentMethod);
// Remove a payment method
router.delete("/finance/payment-methods/:method_id", authenticateUser, pc.removePaymentMethod);
// Fetch transaction history
router.get("/finance/transactions", authenticateUser, pc.getTransactionHistory);


////
// Social Features
////

// Fetch user's friends list
router.get("/friends", authenticateUser, pc.getFriendsList);
// Send a friend request
router.post("/friends/request", authenticateUser, pc.sendFriendRequest);
// Accept a friend request
router.post("/friends/accept/:request_id", authenticateUser, pc.acceptFriendRequest);
// Remove a friend
router.delete("/friends/:friend_id", authenticateUser, pc.removeFriend);


////
// Security & Account Settings
////

// Change password
router.put("/password", authenticateUser, pc.updatePassword);
// Deactivate account
router.delete("/deactivate", authenticateUser, pc.deactivateAccount);

////
// Profile Info
////

// Fetch the profile of the current user
router.get("/", authenticateUser, pc.getCurrentUser);
// Fetch a single user by their ID
router.get("/:id", pc.getUserByID);
// Update user profile details 
router.patch("/:id", authenticateUser, pc.updateProfileInfo);


module.exports = router;

