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
  makePayment,
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/events.js");
const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/expenses", getExpenses);
router.get("/plans", getPlans);
router.get("/:eventId", getEvent);
router.put("/addMember", addMember);
router.delete("/removeMember", removeMember);
router.post("/plans", addPlan);
router.put("/plans", updatePlan);
router.post("/payments", makePayment);
router.post("/expenses", addExpense);
router.delete("/expenses", deleteExpense);

module.exports = router;
