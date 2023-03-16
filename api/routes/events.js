const express = require("express");

const {
  createEvent,
  getEvents,
  getEvent,
  addMember,
  removeMember,
  addPlan,
  getPlans,
  updatePlan,
} = require("../controllers/events.js");
const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/plans", getPlans);
router.get("/:eventId", getEvent);
router.put("/addMember", addMember);
router.delete("/removeMember", removeMember);
router.post("/plans", addPlan);
router.put("/plans", updatePlan);

module.exports = router;
