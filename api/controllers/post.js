const { User, Posts } = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

const moment = require("moment");
const jwt = require("jsonwebtoken");

const getPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    if (!req.query.eventId) {
      try {
        const posts = await Posts.findAll({
          include: {
            model: User,
            attributes: ["id", "username", "profilePicture"],
            where: {
              id: {
                [Op.in]: Sequelize.literal(
                  "(SELECT followedId FROM relationships WHERE followerId = " +
                    userInfo.id +
                    ")"
                ),
              },
            },
          },
          attributes: [
            "id",
            "userId",
            "post_image",
            "post_description",
            "post_date",
          ],
          order: [["post_date", "DESC"]],
        });
        return res.status(200).json(posts);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }
    try {
      const post = await Posts.findAll({
        include: {
          model: User,
          attributes: ["id", "username", "profilePicture"],
        },
        attributes: [
          "id",
          "userId",
          "post_image",
          "post_description",
          "post_date",
        ],
        order: [["post_date", "DESC"]],
        where: { event_id: req.query.eventId },
      });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
};

const addPost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Posts.create({
        userId: userInfo.id,
        post_description: req.body.postDescription,
        post_image: req.body.imgURL,
        event_id: req.body.eventId,
        post_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      res.status(200).json("Post created successfully.");
    } catch (err) {
      console.log(err);
      return res.status(403).json(err);
    }
  });
};

const getUserPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
  });
  try {
    const post = await Posts.findAll({
      where: { userId: req.query.userId },
      include: { model: User, attributes: ["username", "profilePicture"] },
      attributes: [
        "id",
        "userId",
        "post_image",
        "post_description",
        "post_date",
      ],
      order: [["post_date", "DESC"]],
    });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    await Posts.destroy({
      where: { id: req.query.postId },
    });
    res.status(200).json("Post has been deleted.");
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getPosts, addPost, getUserPosts, deletePost };
