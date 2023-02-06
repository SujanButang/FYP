const Sequelize = require("sequelize");
const db = require("../config/database");
const userinterest = require("./userInterest");

const interests = db.define(
  "interests",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    interestName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

interests.hasMany(userinterest);

userinterest.belongsTo(interests);

module.exports = interests;
