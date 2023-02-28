const Sequelize = require("sequelize");
const db = require("../config/database");

const chat = db.define(
  "chat",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    members: {
      type: Sequelize.JSON,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

chat.sync({ alter: true });
module.exports = chat;
