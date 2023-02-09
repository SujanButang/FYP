const express = require("express");
const {
  getRelationships,
  addRelationship,
  deleteRelationship,
} = require("../controllers/Relationship.js");

const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

module.exports = router;
