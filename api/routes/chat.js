const express = require("express");
const { createChat, getChats } = require("../controllers/chats.js");

const router = express.Router();

router.get("/", getChats);
router.post("/", createChat);
// router.delete("/", deleteChat);

module.exports = router;
