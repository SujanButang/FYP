const Sequelize = require("sequelize");
const db = require("../config/database");
const users = require("./User");

const posts = db.define(
  "posts",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    post_image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    post_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    post_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    like_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = posts;
