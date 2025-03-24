require('dotenv').config();
const { Sequelize } = require("sequelize");

const db_info = {
  DB_NAME: process.env.DB_NAME,  
  DB_USER: process.env.DB_USER,  
  DB_HOST: process.env.DB_HOST, 
  DB_PASSWORD: process.env.DB_PASSWORD,
};

const sequelize = new Sequelize(
  db_info.DB_NAME, 
  db_info.DB_USER, 
  db_info.DB_PASSWORD, 
  {
    host: db_info.DB_HOST,
    dialect: "postgres",
    logging: false, // Disable logging SQL queries (optional)
    define: {
      freezeTableName: true, // Ensures Sequelize does not change table names
    },  
  }
);

module.exports = sequelize;