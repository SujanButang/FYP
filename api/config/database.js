const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

module.exports = new Sequelize("social", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
