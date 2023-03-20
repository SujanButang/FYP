"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(Votes, { foreignKey: "voter_id" });
      Votes.belongsTo(models.User, { foreignKey: "voter_id" });
    }
  }
  Votes.init(
    {
      suggestion_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      voter_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Votes",
    }
  );
  return Votes;
};
