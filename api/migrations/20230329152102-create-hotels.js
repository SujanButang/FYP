'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      distance: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.STRING
      },
      average: {
        type: Sequelize.STRING
      },
      reviews: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      price_for_x_night: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      discounted_price: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hotels');
  }
};