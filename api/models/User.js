const Sequelize = require("sequelize");
const db = require("../config/database");
const posts = require("./Posts");
const comments = require("./Comments");
const likes = require("./Likes");
const interests = require("./Interests");
const userInterest = require("./userInterest");

const users = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    birthDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "defaultProfile.png",
    },
    coverPicture: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "defaultCover.png",
    },
    gender: {
      type: Sequelize.ENUM("Male", "Female"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

users.hasMany(posts);

posts.belongsTo(users);

users.hasMany(likes);

likes.belongsTo(users);

users.hasMany(comments);

comments.belongsTo(users);

users.hasMany(userInterest);

userInterest.belongsTo(users);

users.sync();

module.exports = users;
