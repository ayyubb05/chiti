'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('group_cycles', 'status', {
      type: Sequelize.ENUM('inactive', 'active', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'inactive',
    });

    await queryInterface.addColumn('group_cycles', 'cycle_progress', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    
    await queryInterface.removeColumn('group_cycles', 'created_by_user_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('group_cycles', 'status');
    await queryInterface.removeColumn('group_cycles', 'cycle_progress');
    await queryInterface.addColumn('group_cycles', 'created_by_user_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
    });

    // Optional: remove ENUM type if not reused elsewhere
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_group_cycles_status";');
  }
};