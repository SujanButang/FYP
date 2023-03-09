const express = require("express");

const {
  createEvent,
  getEvents,
  getEvent,
  addMember,
  removeMember,
} = require("../controllers/events.js");
const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:eventId", getEvent);
router.put("/addMember", addMember);
router.delete("/removeMember", removeMember);

module.exports = router;
