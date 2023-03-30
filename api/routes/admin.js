const express = require("express");
const {
  getEvents,
  getUserEvents,
  getParticipatedEvents,
} = require("../controllers/events");
const { getHotels, addHotel, searchHotels } = require("../controllers/hotels");
const router = express.Router();
const { getUsers } = require("../controllers/users");

router.get("/users", getUsers);
router.get("/events", getEvents);
router.get("/userevents", getUserEvents);
router.get("/participatedevents", getParticipatedEvents);
router.get("/hotels", getHotels);
router.post("/hotels", addHotel);
router.get("/hotels/search", searchHotels);

module.exports = router;
