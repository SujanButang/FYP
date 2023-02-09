const express = require("express");
const {
  getPosts,
  addPost,
  getUserPosts,
  deletePost,
} = require("../controllers/post.js");

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get("/userPost", getUserPosts);
router.delete("/", deletePost);

module.exports = router;
