"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messages.init(
    {
      chatId: {
        type: DataTypes.INTEGER,
        references: { model: "Chats", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      roomId: {
        type: DataTypes.INTEGER,
        references: { model: "Rooms", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      senderId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      messageText: DataTypes.STRING,
      messageImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
