const express = require("express");
const { searchHotels } = require("../controllers/hotels");

const router = express.Router();

router.get("/", searchHotels);

module.exports = router;
