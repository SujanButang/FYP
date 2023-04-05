const express = require("express");

const {
  createEvent,
  getEvents,
  getEvent,
  addMember,
  getMembers,
  removeMember,
  addPlan,
  getPlans,
  updatePlan,
  makePayment,
  getPayment,
  addExpense,
  getExpenses,
  deleteExpense,
  setIntake,
  editEvents,
  cancelEvent,
} = require("../controllers/events.js");
const router = express.Router();

router.post("/", createEvent);
router.put("/", editEvents);
router.put("/cancel", cancelEvent);
router.get("/payments", getPayment);
router.get("/", getEvents);
router.get("/expenses", getExpenses);
router.get("/plans", getPlans);
router.get("/:eventId", getEvent);
router.get("/members", getMembers);
router.put("/intake", setIntake);
router.put("/addMember", addMember);
router.delete("/removeMember", removeMember);
router.post("/plans", addPlan);
router.put("/plans", updatePlan);
router.post("/payments", makePayment);
router.post("/expenses", addExpense);
router.delete("/expenses", deleteExpense);

module.exports = router;
