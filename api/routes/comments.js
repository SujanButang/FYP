const express = require("express");
const { getComments, addComment } = require("../controllers/comments.js");

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);

module.exports = router;
