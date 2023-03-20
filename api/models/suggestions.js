"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suggestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Suggestions.hasMany(models.Votes, { foreignKey: "suggestion_id" });
      models.Votes.belongsTo(Suggestions, { foreignKey: "Suggestion_id" });
    }
  }
  Suggestions.init(
    {
      plan_id: DataTypes.INTEGER,
      suggestion_description: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Suggestions",
    }
  );
  return Suggestions;
};
