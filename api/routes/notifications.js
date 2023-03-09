const express = require("express");
const {
  getNotifications,
  createNotification,
  readNotification,
} = require("../controllers/notifications.js");

const router = express.Router();

router.get("/", getNotifications);
router.post("/", createNotification);
router.put("/", readNotification);

module.exports = router;
