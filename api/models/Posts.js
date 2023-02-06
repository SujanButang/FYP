const Sequelize = require("sequelize");
const db = require("../config/database");
const comments = require("./Comments");
const likes = require("./Likes");

const posts = db.define(
  "posts",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

posts.hasMany(comments);
comments.belongsTo(posts);

posts.hasMany(likes);
likes.belongsTo(posts);

posts.sync();

module.exports = posts;
