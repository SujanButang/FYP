const express = require("express");
const {
  createChat,
  getChats,
  getMembers,
  getRooms,
  getEventRoom,
} = require("../controllers/chats.js");

const router = express.Router();

router.get("/", getChats);
router.get("/members", getMembers);
router.post("/", createChat);
router.get("/rooms", getRooms);
router.get("/event", getEventRoom);
// router.delete("/", deleteChat);

module.exports = router;
