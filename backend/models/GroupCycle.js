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
    status: {
      type: DataTypes.ENUM("inactive", "active", "completed", "cancelled"),
      allowNull: false,
      defaultValue: "inactive",
    },
    cycle_progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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