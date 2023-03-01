const { Likes } = require("../models");
const jwt = require("jsonwebtoken");

const getLikes = async (req, res) => {
  try {
    const like = await Likes.findAll({
      where: { postId: req.query.postId },
    });
    return res.status(200).json(like.map((lk) => lk.userId));
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const addLike = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Likes.create({
        userId: userInfo.id,
        postId: req.query.postId,
      });
      res.status(200).json("Like created successfully.");
    } catch (err) {
      res.status(403).json(err);
    }
  });
};

const deleteLike = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Likes.destroy({
        where: { userId: userInfo.id, postId: req.query.postId },
      });
      res.status(200).json("Like deleted successfully.");
    } catch (err) {
      res.status(403).json(err);
    }
  });
};

module.exports = { getLikes, addLike, deleteLike };
