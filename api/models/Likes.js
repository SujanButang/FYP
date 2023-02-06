const Sequelize = require("sequelize");
const db = require("../config/database");

const likes = db.define(
  "likes",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    postId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = likes;
