const { User, Comments } = require("../models");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const getComments = async (req, res) => {
  try {
    const comment = await Comments.findAll({
      where: { postId: req.query.postId },
      include: { model: User, attributes: ["username", "profilePicture"] },
      attributes: ["id", "userId", "comment_description", "comment_date"],
      order: [["comment_date", "DESC"]],
    });
    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const addComment = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Comments.create({
        userId: userInfo.id,
        comment_description: req.body.commentDescription,
        comment_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        postId: req.query.postId,
      });
      res.status(200).json("Comment created successfully.");
    } catch (err) {
      console.log(err);
      res.status(403).json(err);
    }
  });
};

module.exports = { getComments, addComment };
