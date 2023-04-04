const express = require("express");
const {
  getEvents,
  getUserEvents,
  getParticipatedEvents,
  getPayment,
  getPayments,
} = require("../controllers/events");
const { getHotels, addHotel, searchHotels } = require("../controllers/hotels");
const router = express.Router();
const { getAllUsers, getUser } = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/events", getEvents);
router.get("/userevents", getUserEvents);
router.get("/participatedevents", getParticipatedEvents);
router.get("/hotels", getHotels);
router.post("/hotels", addHotel);
router.get("/hotels/search", searchHotels);
router.get("/users/find/:userId", getUser);
router.get("/payments", getPayment);
router.get("/allpayments", getPayments);

module.exports = router;
