'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expenses.init({
    event_id: DataTypes.INTEGER,
    expense_title: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expenses',
  });
  return Expenses;
};