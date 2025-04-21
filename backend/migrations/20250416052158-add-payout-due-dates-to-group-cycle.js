'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('group_cycles', 'payout_date', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('group_cycles', 'payment_deadline', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('group_cycles', 'payout_date');
    await queryInterface.removeColumn('group_cycles', 'payment_deadline');
  }
};
