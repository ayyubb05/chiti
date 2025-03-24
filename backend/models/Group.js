const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Group extends Model {}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional, but useful for public visibility
    },
    monthly_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      set(value) {
        this.setDataValue('monthly_fee', parseFloat(value));
      }
    },
    payment_deadline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 28,
      },
    },
    group_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[3, 4, 6, 12]], 
      },
    },
    visibility: {
      type: DataTypes.ENUM("public", "private"),
      allowNull: false,
      defaultValue: "private", // Private by default for added security
    },
    payout_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 28, // Ensures payout happens within valid calendar dates
      },
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    payout_order: {
      type: DataTypes.JSON,
      allowNull: true, // Allows storing preset payout order as JSON array
    },
    chat_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Ensures chat is enabled by default
    },
    notification_preferences: {
      type: DataTypes.JSON,
      allowNull: true, // Enables flexible notification rules for the group
    }
  },
  {
    sequelize,
    modelName: "Group",
    tableName: "groups",
    timestamps: true,
    underscored: true,
    defaultScope: {
      attributes: { exclude: ["admin_id"] },
    },
  }
);

module.exports = Group;