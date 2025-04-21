const sequelize = require("../config/database");

// Initialize models with Sequelize instance
const User = require("./User");
const Group = require("./Group");
const GroupCycle = require("./GroupCycle");
const GroupMember = require("./GroupMember");
const JoinRequest = require("./JoinRequest");
const Message = require("./Message");


// Associations
User.hasMany(GroupMember, { foreignKey: "user_id", onDelete: "CASCADE" });
GroupMember.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Group.hasMany(GroupMember, { foreignKey: "group_id", onDelete: "CASCADE" });
GroupMember.belongsTo(Group, { foreignKey: "group_id", onDelete: "CASCADE" });

// Add relationships for JoinRequest model
User.hasMany(JoinRequest, { foreignKey: "user_id", onDelete: "CASCADE" });
JoinRequest.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Group.hasMany(JoinRequest, { foreignKey: "group_id", onDelete: "CASCADE" });
JoinRequest.belongsTo(Group, { foreignKey: "group_id", onDelete: "CASCADE" });

// Messages relationships
Group.hasMany(Message, { foreignKey: "group_id", onDelete: "CASCADE" });
Message.belongsTo(Group, { foreignKey: "group_id", onDelete: "CASCADE" });

User.hasMany(Message, { foreignKey: "user_id", onDelete: "CASCADE" });
Message.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });


// Export models
const models = {
  sequelize,
  User,
  Group,
  GroupCycle,
  GroupMember,
  Message,
  JoinRequest,
};

module.exports = models;