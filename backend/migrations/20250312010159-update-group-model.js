"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("groups", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("groups", "visibility", {
      type: Sequelize.ENUM("public", "private"),
      allowNull: false,
      defaultValue: "private",
    });

    await queryInterface.addColumn("groups", "payout_day", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 28 },
      defaultValue: 1,
    });

    await queryInterface.addColumn("groups", "payout_order", {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn("groups", "chat_enabled", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("groups", "notification_preferences", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("groups", "description");
    await queryInterface.removeColumn("groups", "visibility");
    await queryInterface.removeColumn("groups", "payout_day");
    await queryInterface.removeColumn("groups", "payout_order");
    await queryInterface.removeColumn("groups", "chat_enabled");
    await queryInterface.removeColumn("groups", "notification_preferences");
  },
};