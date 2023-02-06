const Sequelize = require("sequelize");
const db = require("../config/database");

const comments = db.define(
  "comments",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    postId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    comment_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comment_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = comments;
