module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('group_members', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'member', // Default value for role
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('group_members', 'role');
  },
};