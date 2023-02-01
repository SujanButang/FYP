const posts = require("../models/Posts");
const users = require("../models/User");
const getPosts = async (req, res) => {
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
    });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getPosts };
