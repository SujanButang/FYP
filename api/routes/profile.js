const express = require("express");
const {
  getUser,
  updateUser,
  getUsers,
  verifyProfile,
} = require("../controllers/users.js");

const router = express.Router();

router.post("/verification", verifyProfile);
router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/", getUsers);

module.exports = router;
