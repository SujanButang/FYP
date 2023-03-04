const express = require("express");
const { createMessage, getMessages } = require("../controllers/messages.js");

const router = express.Router();

router.get("/:chatId", getMessages);
router.post("/", createMessage);
// router.delete("/", deleteChat);

module.exports = router;
