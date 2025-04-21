'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('group_cycles', 'length', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 12,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('group_cycles', 'length');
  }
};