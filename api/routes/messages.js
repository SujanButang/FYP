const express = require("express");
const {
  createMessage,
  getMessages,
  getRoomsMessages,
} = require("../controllers/messages.js");

const router = express.Router();

router.get("/:chatId", getMessages);
router.post("/", createMessage);
router.get("/group/:roomId", getRoomsMessages);
// router.delete("/", deleteChat);

module.exports = router;
