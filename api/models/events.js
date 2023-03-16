"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Events.hasMany(models.Plans);
      models.Plans.belongsTo(Events);
    }
  }
  Events.init(
    {
      destination: DataTypes.STRING,
      eventType: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      members: DataTypes.JSON,
      eventDescription: DataTypes.STRING,
      host: DataTypes.INTEGER,
      destinationImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
