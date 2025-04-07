'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('groups', 'payment_deadline');
    await queryInterface.removeColumn('groups', 'payout_day');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('groups', 'payment_deadline', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('groups', 'payout_day', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};