const { Chats, Rooms, Events } = require("../models");
const sequelize = require("sequelize");

const jwt = require("jsonwebtoken");

// const getChats = async (req, res) => {
//   try {
//     const chat = await Chats.findAll({
//       where: { postId: req.query.postId },
//     });
//     return res.status(200).json(like.map((lk) => lk.userId));
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err);
//   }
// };

const createChat = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      const chat = await Chats.findOne({
        where: sequelize.literal(
          `JSON_CONTAINS(members,'${userInfo.id}') AND JSON_CONTAINS(members,'${req.query.receiver}')`
        ),
      });
      if (!chat) {
        await Chats.create({
          members: [userInfo.id, parseInt(req.query.receiver)],
        });

        res.status(200).json("Chat created successfully.");
      }
    } catch (err) {
      console.log(err);
      res.status(403).json(err);
    }
  });
};

const getChats = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      const chat = await Chats.findAll({
        where: {
          members: sequelize.literal(
            `JSON_CONTAINS(members, '${userInfo.id}')`
          ),
        },
        attributes: ["id", "members"],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(chat);
    } catch (err) {
      console.log(err);
      res.status(403).json(err);
    }
  });
};

const getEventRoom = async (req, res) => {
  try {
    console.log(req.query.roomId);
    const room = await Rooms.findAll({
      where: {
        id: req.query.roomId,
      },
      attributes: ["id", "members"],
      order: [["createdAt", "DESC"]],
      include: {
        model: Events,
        attributes: [
          "id",
          "destination",
          "members",
          "eventType",
          "destinationImage",
        ],
      },
    });
    return res.status(200).json(room);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getRooms = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      const room = await Rooms.findAll({
        where: {
          members: sequelize.literal(
            `JSON_CONTAINS(Rooms.members, '${userInfo.id}')`
          ),
        },
        attributes: ["id", "members"],
        order: [["createdAt", "DESC"]],
        include: {
          model: Events,
          attributes: [
            "id",
            "destination",
            "eventType",
            "members",
            "destinationImage",
          ],
        },
      });
      res.status(200).json(room);
    } catch (err) {
      console.log(err);
      res.status(403).json(err);
    }
  });
};

const getMembers = async (req, res) => {
  try {
    const chat = await Chats.findAll({
      where: {
        id: req.query.chatId,
      },
      attributes: ["members"],
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
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

module.exports = { createChat, getChats, getMembers, getRooms, getEventRoom };
