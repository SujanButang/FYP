const express = require("express");

const { createEvent, getEvents } = require("../controllers/events.js");
const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);

module.exports = router;
