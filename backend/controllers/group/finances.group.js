// Import necessary models
const { Group, User, JoinRequest, GroupMember, sequelize } = require('../../models');

////
// Payment & Financial Management
////

async function getNextPaymentDetails(req, res) {
  // TODO:
  // Get group details
  // Get members details
  // ...
  return res.status(500).json({ error: "Internal Server Error" });
}


// View group payment details (e.g., next payment date, balance)
async function getGroupFinance(req, res) {
  const { group_id } = req.params;
  const admin_id = req.user.id;

  try {
    // Ensure the group exists and user is an admin of the group
    const group = await Group.findByPk(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    const groupAdmin = await GroupMember.findOne({
      where: { group_id, user_id: admin_id, role: 'admin' }
    });

    if (!groupAdmin) {
      return res.status(403).json({ error: "You do not have permission to view group payment details." });
    }

    // Fetch the payment details for the group
    // For example, payment date and outstanding balance. This would depend on your schema.
    const paymentDetails = {
      nextPaymentDate: group.next_payment_date, // Assuming 'next_payment_date' exists in your model
      groupBalance: group.balance, // Assuming 'balance' field exists in the model
    };

    return res.json({ paymentDetails });
  } catch (error) {
    console.error("Error fetching group finance details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Manage group payments (admin only)
async function updateGroupFinance(req, res) {
  const { group_id } = req.params;
  const { next_payment_date, balance } = req.body;
  const admin_id = req.user.id;

  try {
    // Ensure the group exists and user is an admin of the group
    const group = await Group.findByPk(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    const groupAdmin = await GroupMember.findOne({
      where: { group_id, user_id: admin_id, role: 'admin' }
    });

    if (!groupAdmin) {
      return res.status(403).json({ error: "You do not have permission to update group finance details." });
    }

    // Update group payment details (next payment date and balance)
    await group.update({ next_payment_date, balance });

    return res.json({ message: "Group finance details updated successfully." });
  } catch (error) {
    console.error("Error updating group finance details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getGroupFinance,
  updateGroupFinance,
  getNextPaymentDetails,
};