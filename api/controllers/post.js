const posts = require("../models/Posts");
const users = require("../models/User");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const getPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
  });
  try {
    const post = await posts.findAll({
      include: { model: users, attributes: ["username", "profilePicture"] },
      attributes: [
        "id",
        "userId",
        "post_image",
        "post_description",
        "post_date",
        "like_count",
      ],
      order: [["post_date", "DESC"]],
    });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const addPost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await posts.create({
        userId: userInfo.id,
        post_description: req.body.postDescription,
        post_image: req.body.postImage,
        post_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      res.status(200).json("Post created successfully.");
    } catch (err) {
      console.log(err);
      res.status(403).json(err);
    }
  });
};

module.exports = { getPosts, addPost };
