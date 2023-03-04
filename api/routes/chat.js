const express = require("express");
const { createChat, getChats, getMembers } = require("../controllers/chats.js");

const router = express.Router();

router.get("/", getChats);
router.get("/members", getMembers);
router.post("/", createChat);
// router.delete("/", deleteChat);

module.exports = router;
