const express = require("express");
const {
  getSuggestions,
  addSuggestion,
  getVotes,
  addVote,
  removeVote,
} = require("../controllers/suggestions.js");

const router = express.Router();

router.get("/", getSuggestions);
router.post("/", addSuggestion);
router.get("/votes", getVotes);
router.post("/votes", addVote);
router.put("/votes", removeVote);

module.exports = router;
