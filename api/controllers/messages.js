const { Messages } = require("../models");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

const createMessage = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      if (req.query.chatId) {
        await Messages.create({
          senderId: userInfo.id,
          messageText: req.body.message,
          messageImg: req.body.img,
          chatId: req.query.chatId,
        });
      } else {
        await Messages.create({
          senderId: userInfo.id,
          messageText: req.body.message,
          messageImg: req.body.img,
          roomId: req.query.roomId,
        });
      }
      res.status(200).json("Message sent successfully.");
    } catch (err) {
      console.log(err);
      res.status(403).json(err);
    }
  });
};

const getMessages = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      const message = await Messages.findAll({
        where: {
          chatId: req.params.chatId,
        },
      });
      res.status(200).json(message);
    } catch (err) {
      res.status(403).json(err);
    }
  });
};

const getRoomsMessages = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      const message = await Messages.findAll({
        where: {
          roomId: req.params.roomId,
        },
      });
      res.status(200).json(message);
    } catch (err) {
      res.status(403).json(err);
    }
  });
};
// const deleteLike = async (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(403).json("User is not logged in.");
//   jwt.verify(token, "secretKey", async (err, userInfo) => {
//     if (err) return res.status(403).json("Token not valid");
//     try {
//       await Likes.destroy({
//         where: { userId: userInfo.id, postId: req.query.postId },
//       });
//       res.status(200).json("Like deleted successfully.");
//     } catch (err) {
//       res.status(403).json(err);
//     }
//   });
// };

module.exports = { createMessage, getMessages, getRoomsMessages };
