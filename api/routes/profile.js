const express = require("express");
const { getUser, updateUser, getUsers } = require("../controllers/users.js");

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/", getUsers);

module.exports = router;
