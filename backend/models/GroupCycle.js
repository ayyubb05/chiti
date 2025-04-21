const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class GroupCycle extends Model {}

GroupCycle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "groups",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    payment_deadline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 28,
      },
    },
    payout_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 28,
      },
    },
    status: {
      type: DataTypes.ENUM("inactive", "active", "completed", "cancelled"),
      allowNull: false,
      defaultValue: "inactive",
    },
    payout_order: {
      type: DataTypes.JSON,
      allowNull: true, // Allows storing preset payout order as JSON array
    },
    cycle_progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 12,
    },
  },
  {
    sequelize,
    modelName: "GroupCycle",
    tableName: "group_cycles",
    timestamps: true,
    underscored: true,
  }
);

module.exports = GroupCycle;