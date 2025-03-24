const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class JoinRequest extends Model {}

JoinRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "cancelled"),
      allowNull: false,
      defaultValue: "pending", // Default status is "pending"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Refers to the 'users' table
        key: "id",
      },
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "groups", // Refers to the 'groups' table
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "JoinRequest",
    tableName: "join_requests", // Ensures lowercase table name
    timestamps: true, // Adds createdAt and updatedAt fields
    underscored: true, // Converts camelCase to snake_case
  }
);

module.exports = JoinRequest;