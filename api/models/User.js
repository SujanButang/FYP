const Sequelize = require("sequelize");
const db = require("../config/database");
const posts = require("./Posts");
const comments = require("./Comments");

const users = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

users.hasMany(posts);

posts.belongsTo(users);

users.hasMany(comments);

comments.belongsTo(users);

module.exports = users;
