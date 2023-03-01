"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Interests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Interests.hasMany(models.userInterest);
      models.userInterest.belongsTo(Interests);
    }
  }
  Interests.init(
    {
      interestName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Interests",
    }
  );
  return Interests;
};
