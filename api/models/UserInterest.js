const Sequelize = require("sequelize");
const db = require("../config/database");

const userinterest = db.define(
  "userinterests",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    interestId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

userinterest.sync();
module.exports = userinterest;
