const { Events } = require("../models");
const jwt = require("jsonwebtoken");

const createEvent = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      const event = await Events.findOne({
        where: { host: userInfo.id },
      });
      if (event) {
        return res.status(403).json("User already has an event running.");
      } else {
        await Events.create({
          destination: req.body.destination,
          eventType: req.body.type,
          startDate: req.body.start,
          endDate: req.body.end,
          members: req.body.members,
          eventDescription: req.body.desc,
          host: userInfo.id,
          destinationImage: req.body.destPic,
        }).then(() => res.status(200).json("Event created successfully."));
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
};

const getEvents = async (req, res) => {
  try {
    const event = await Events.findAll();
    return res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createEvent, getEvents };
