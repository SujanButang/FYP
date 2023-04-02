const express = require("express");
const router = express.Router();
const { getUser, updateUser, getUsers } = require("../controllers/users");

router.get("/find/:userId", getUser);
router.put("/", updateUser);

export default router;
