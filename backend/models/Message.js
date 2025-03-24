const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Message extends Model {}

Message.init(
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: true, // Adds createdAt and updatedAt fields
    underscored: true, // Converts camelCase to snake_case
  }
);

module.exports = Message;