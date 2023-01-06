const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/users");

router.get("/find/:userId", getUser);

export default router;
