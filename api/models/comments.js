"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comments.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      comment_description: DataTypes.STRING,
      comment_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
