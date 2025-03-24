// Import the necessary models
const { Group, User, JoinRequest, GroupMember } = require('../../models');

////
// Financial Management
////


// Fetch user's payment methods
async function getPaymentMethods(req, res) {};

// Add a new payment method
async function addPaymentMethod(req, res) {};

// Remove a payment method
async function removePaymentMethod(req, res) {};

// Fetch transaction history
async function getTransactionHistory(req, res) {};


module.exports = {
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getTransactionHistory,
};