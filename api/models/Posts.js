"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.hasMany(models.Likes);
      models.Likes.belongsTo(Posts);

      Posts.hasMany(models.Comments);
      models.Comments.belongsTo(Posts);
    }
  }
  Posts.init(
    {
      userId: DataTypes.INTEGER,
      post_image: DataTypes.STRING,
      post_description: DataTypes.STRING,
      event_id: DataTypes.INTEGER,
      post_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
