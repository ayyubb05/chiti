const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Ensuring unique usernames
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Ensures lowercase table name
    timestamps: true, // Adds createdAt and updatedAt fields
    underscored: true, // Converts camelCase to snake_case
    defaultScope: {
      // attributes: { exclude: ["password_hash"] }, // Hides password by default
    },
  }
);

module.exports = User;