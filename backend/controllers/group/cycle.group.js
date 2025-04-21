const { Group, GroupCycle, GroupMember } = require('../../models');
const { Op } = require('sequelize');

////
/// Shared Helpers
////

async function findGroupOrFail(group_id, res) {
  const group = await Group.findByPk(group_id);
  if (!group) {
    res.status(404).json({ message: "Group not found" });
    return null;
  }
  return group;
}

async function findCycleOrFail(group_id, status, res) {
  const cycle = await GroupCycle.findOne({
    where: { group_id, status },
  });
  if (!cycle) {
    res.status(404).json({ message: `Cycle with status '${status}' not found.` });
    return null;
  }
  return cycle;
}

async function generatePayoutOrder (group_id, res) {
  const members = await GroupMember.findAll({ 
    where : { group_id },
  })
  if (members.length === 0) {
    res.status(404).json({ message: 'No members found.' });
    return null;
  }
  members.sort(() => Math.random() - 0.5);
  return members.map(m => m.user_id);
}


////
/// Cycle Controls (Restricted to Group Admins)
////

async function createGroupCycle(req, res) {
  const { group_id, start_date, payment_deadline, payout_date, length = 12 } = req.body;
  const start = new Date(start_date);
  const end = new Date(start.getFullYear(), start.getMonth() + length, 1);
  const end_date = end.toISOString().split("T")[0]; // "YYYY-MM-DD"

  try {
    const group = await findGroupOrFail(group_id, res);
    if (!group) return;

    const cycle = await GroupCycle.findOne({
      where: { 
        group_id, 
        status: { [Op.in]: ['active', 'inactive'] },
      },
    });

    if (cycle) {
      return res.status(404).json({ message: "Cannot create a new cycle when (in)active cycle exists." });
    }

    const payout_order = await generatePayoutOrder(group_id, res);
    if (!payout_order) return;


    const newCycle = await GroupCycle.create({
      group_id,
      start_date,
      end_date,
      payment_deadline,
      payout_date,
      status: 'inactive',
      cycle_progress: 0,
      length: 12,
      payout_order,
    });

    res.status(201).json({
      message: "Group cycle created successfully.",
      cycle: newCycle,
    });
  } catch (error) {
    console.error("Error creating group cycle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function startCycle(req, res) {
  const { group_id } = req.params;

  // TODO: automatically call this on the start date

  try {
    const group = await findGroupOrFail(group_id, res);
    if (!group) return;

    const cycle = await findCycleOrFail(group_id, 'inactive', res);
    if (!cycle) return;

    cycle.status = 'active';
    cycle.cycle_progress = 1;
    await cycle.save();

    res.status(200).json({
      message: "Group cycle started successfully.",
      cycle,
    });
  } catch (error) {
    console.error("Error starting group cycle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateCycle(req, res) {
  const { group_id } = req.params;

  // TODO: automatically call this on the first of each month while the cycle is active

  try {
    const group = await findGroupOrFail(group_id, res);
    if (!group) return;

    const cycle = await findCycleOrFail(group_id, 'active', res);
    if (!cycle) return;

    cycle.cycle_progress += 1;
    if (cycle.cycle_progress > cycle.cycle_length) {
      cycle.status = 'completed';
    }
    await cycle.save();

    res.status(200).json({
      message: "Group cycle updated successfully.",
      cycle,
    });
  } catch (error) {
    console.error("Error updating group cycle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// get all cycles (not just active)
async function getCycleHistory(req, res) {
  const { group_id } = req.params;

  try {
    const group = await findGroupOrFail(group_id, res);
    if (!group) return;

    const cycles = await GroupCycle.findAll({
      where: { group_id },
      attributes: ['id', 'group_id', 'start_date', 'end_date', 'payment_deadline', 'payout_date', 'status', 'length', 'payout_order'],
    });

    if (cycles.length === 0) {
      return res.status(404).json({ message: "No cycles found." });
    }

    res.status(200).json({
      message: "Group cycle(s) found successfully.",
      cycles,
    });
  } catch (error) {
    console.error("Error retrieving group cycle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getCycleInfo(req, res, options = {}) {
  const { group_id } = req.params;
  const { status } = options;

  try {
    const group = await findGroupOrFail(group_id, res);
    if (!group) return;

    const cycle = await GroupCycle.findOne({
      where: { group_id, status },
    });

    if (!cycle) {
      return res.status(404).json({ message: `Cycle with status '${status}' not found.` });
    }

    res.status(200).json({
      message: `Group cycle (${status}) found successfully.`,
      cycle,
    });
  } catch (error) {
    console.error("Error retrieving group cycle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getActiveCycleInfo(req, res) {
  return getCycleInfo(req, res, { status: "active" });
}

async function getNewCycleInfo(req, res) {
  return getCycleInfo(req, res, { status: "inactive" });
}

module.exports = {
  startCycle,
  getCycleHistory,
  getActiveCycleInfo,
  getNewCycleInfo,
  createGroupCycle,
  updateCycle,
};