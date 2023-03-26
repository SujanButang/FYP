"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rooms.hasMany(models.Messages);
      models.Messages.belongsTo(Rooms);
    }
  }
  Rooms.init(
    {
      event_id: DataTypes.INTEGER,
      members: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Rooms",
    }
  );
  return Rooms;
};
