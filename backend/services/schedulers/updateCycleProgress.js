const cron = require('node-cron');
const { GroupCycle } = require('../../models');
const { Op } = require('sequelize');

// Run this job at midnight on the 1st of every month
cron.schedule('0 0 1 * *', async () => {
  try {
    const activeCycles = await GroupCycle.findAll({
      where: { status: 'active' },
    });

    for (const cycle of activeCycles) {
      // Check if current date is still within the cycle period
      const now = new Date();
      const endDate = new Date(cycle.end_date);
      if (now <= endDate) {
        cycle.cycle_progress += 1;
        await cycle.save();
        console.log(
          `Cycle progress updated for GroupCycle ID ${cycle.id}: now at ${cycle.cycle_progress}`
        );
      }
    }

    console.log(`Cycle progress update completed at ${new Date()}`);
  } catch (error) {
    console.error('Error updating cycle progress:', error);
  }
});