// Import necessary models
const { Group, GroupCycle } = require('../../models'); // assuming you have GroupCycle model for cycles
const { Op } = require('sequelize');

////
// Cycle Controls (Restricted to Group Admins)
////


// Start cycle - currently placeholder
async function startCycle(req, res) {
  const { group_id } = req.params; // Assuming cycle_number is passed in the URL (GET request)

  try {
    const group = await Group.findByPk(group_id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Fetch cycle by group_id and 'inactive' status
    const cycle = await GroupCycle.findOne({
      where: {
        group_id,
        status: 'inactive',
      },
    });

    if (!cycle) {
      return res.status(404).json({ message: "Cycle not found or already active" });
    }

    // Update cycle status to 'active'
    cycle.status = 'active';
    cycle.cycle_progress = 1; // Assuming the cycle starts at 1 when it becomes active

    // Save the updated cycle
    await cycle.save();

    return res.status(200).json({
      message: "Group cycle started successfully.",
      cycle,
    });
  } catch (error) {
    console.error("Error starting group cycle:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


// Create a new group cycle
async function createGroupCycle(req, res) {
  const { group_id, start_date, end_date } = req.body;

  try {
    const group = await Group.findByPk(group_id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Set status and cycle_progress
    const status = 'inactive'; // Default to inactive when a new cycle is created
    const cycle_progress = 0;  // Start at 0, as it's the default value

    // Assuming you have GroupCycle model and it has necessary fields
    const newCycle = await GroupCycle.create({
      group_id,
      start_date,
      end_date,
      status,
      cycle_progress,
    });

    return res.status(201).json({
      message: "Group cycle created successfully.",
      cycle: newCycle,
    });
  } catch (error) {
    console.error("Error creating group cycle:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


// Get cycle info - updated for correct query usage
async function getCycleInfo(req, res) {
  const { group_id } = req.params; // Assuming cycle_number is passed in the URL (GET request)

  try {
    const group = await Group.findByPk(group_id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Fetch cycle by group_id and 'active' status
    const cycle = await GroupCycle.findOne({
      where: {
        group_id,
        status: 'active', // Ensure the cycle is active
      },
      attributes: ['id', 'group_id', 'start_date', 'end_date', 'status', 'cycle_progress'], // Specify the columns you need
    });

    if (!cycle) {
      return res.status(404).json({ message: "Cycle not found or inactive" });
    }

    return res.status(200).json({
      message: "Group cycle found successfully.",
      cycle,
    });
  } catch (error) {
    console.error("Error retrieving group cycle:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  startCycle,
  getCycleInfo,
  createGroupCycle,
};