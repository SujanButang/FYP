const { Sequelize } = require("sequelize");

module.exports = new Sequelize("social", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
