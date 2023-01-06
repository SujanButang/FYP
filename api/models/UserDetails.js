const Sequelize = require("sequelize");
const db = require("../config/database");

const user_details = db.define(
  "user_details",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    DOB: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cover_pic: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        models: "users",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = user_details;
