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
const {
  getAllUsers,
  getUser,
  getVerifications,
  approveUser,
  revokeUser,
  banUser,
  unbanUser,
} = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/events", getEvents);
router.get("/userevents", getUserEvents);
router.get("/participatedevents", getParticipatedEvents);
router.get("/hotels", getHotels);
router.get("/verifications", getVerifications);
router.post("/hotels", addHotel);
router.get("/hotels/search", searchHotels);
router.get("/users/find/:userId", getUser);
router.get("/payments", getPayment);
router.get("/allpayments", getPayments);
router.put("/users/approve", approveUser);
router.put("/users/revoke", revokeUser);
router.put("/banUser", banUser);
router.put("/unbanUser", unbanUser);

module.exports = router;
