"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      birthDate: {
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.DECIMAL,
      },
      profilePicture: {
        type: Sequelize.STRING,
        defaultValue: "defaultProfile.png",
      },
      coverPicture: {
        type: Sequelize.STRING,
        defaultValue: "defaultCover.png",
      },
      gender: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
