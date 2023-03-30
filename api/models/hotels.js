'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hotels.init({
    name: DataTypes.STRING,
    distance: DataTypes.STRING,
    score: DataTypes.STRING,
    average: DataTypes.STRING,
    reviews: DataTypes.STRING,
    image: DataTypes.STRING,
    price_for_x_night: DataTypes.STRING,
    price: DataTypes.STRING,
    discounted_price: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotels',
  });
  return Hotels;
};