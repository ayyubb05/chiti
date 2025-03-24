const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class GroupMember extends Model {}

GroupMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "compositeIndex",
      references: {
        model: "groups",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "compositeIndex",
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'member', // Default role is 'member'
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "GroupMember",
    tableName: "group_members", // Ensures lowercase table name
    timestamps: false, // No createdAt and updatedAt fields
    underscored: true, // Converts camelCase to snake_case
  }
);
module.exports = GroupMember;