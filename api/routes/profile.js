const express = require("express");
const { getUser, updateUser } = require("../controllers/users.js");

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);

module.exports = router;
