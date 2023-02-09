const Sequelize = require("sequelize");
const db = require("../config/database");

const relationships = db.define(
  "relationships",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    followerId: {
      type: Sequelize.INTEGER,
    },
    followedId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = relationships;
