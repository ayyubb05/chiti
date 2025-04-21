'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('group_cycles', 'payout_order', {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.removeColumn('groups', 'payout_order');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('group_cycles', 'payout_order');

    await queryInterface.addColumn('groups', 'payout_order', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  }
};