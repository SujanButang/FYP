"use strict";
const { on } = require("nodemon");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Posts);
      models.Posts.belongsTo(User);

      User.hasMany(models.userInterest);
      models.userInterest.belongsTo(User);

      User.hasMany(models.Comments);
      models.Comments.belongsTo(User);

      User.hasMany(models.Likes);
      models.Likes.belongsTo(User);

      User.hasMany(models.Events, { foreignKey: "host" });
      models.Events.belongsTo(User, { foreignKey: "host" });

      User.hasMany(models.Notifications, { foreignKey: "from" });
      models.Notifications.belongsTo(User, { foreignKey: "from" });

      User.hasMany(models.Suggestions, { foreignKey: "user_id" });
      models.Suggestions.belongsTo(User, { foreignKey: "user_id" });

      User.hasMany(models.Payments, { foreignKey: "user_id" });
      models.Payments.belongsTo(User, { foreignKey: "user_id" });

      User.hasOne(models.Verification, { foreignKey: "user_id" });
      models.Verification.belongsTo(User, { foreignKey: "user_id" });

      User.hasMany(models.Feedbacks, { foreignKey: "user_id" });
      models.Feedbacks.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      address: DataTypes.STRING,
      phone: DataTypes.DECIMAL,
      profilePicture: DataTypes.STRING,
      coverPicture: DataTypes.STRING,
      gender: DataTypes.STRING,
      status: DataTypes.STRING,
      travelScore: DataTypes.INTEGER,
      ratingCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
