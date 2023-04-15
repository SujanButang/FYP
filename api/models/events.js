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

      Events.hasMany(models.Payments, { foreignKey: "event_id" });
      models.Payments.belongsTo(Events, { foreignKey: "event_id" });

      Events.hasMany(models.Expenses, { foreignKey: "event_id" });
      models.Expenses.belongsTo(Events, { foreignKey: "event_id" });

      Events.hasOne(models.Rooms, { foreignKey: "event_id" });
      models.Rooms.belongsTo(Events, { foreignKey: "event_id" });

      Events.hasMany(models.Feedbacks, { foreignKey: "event_id" });
      models.Feedbacks.belongsTo(Events, { foreignKey: "event_id" });
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
      status: DataTypes.STRING,
      completionStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
