const { Events, User } = require("../models");
const Sequelize = require("sequelize");
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
          members: [userInfo.id],
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
    const event = await Events.findAll({
      include: {
        model: User,
        attributes: ["username", "profilePicture"],
        where: {
          id: Sequelize.col("Events.host"),
        },
      },
    });
    return res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Events.findOne({
      where: { id: req.params.eventId },
    });
    return res.status(200).json(event);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addMember = async (req, res) => {
  try {
    const event = await Events.findOne({
      where: { id: req.query.eventId },
    });
    const members = event.members || []; // retrieve existing members or create an empty array
    members.push(req.body.userId); // append new member to the array
    await Events.update(
      { members: members },
      { where: { id: req.query.eventId } }
    ); // update the members column in the database
    return res.status(200).json("Member added successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const removeMember = async (req, res) => {
  try {
    const event = await Events.findOne({ where: { id: req.query.eventId } });
    const members = event.members || []; // retrieve existing members or create an empty array
    const index = members.indexOf(req.body.userId);
    if (index > -1) {
      members.splice(index, 1); // remove the member from the array
      await Events.update(
        { members: members },
        { where: { id: req.query.eventId } }
      ); // update the members column in the database
      return res.status(200).json("Member removed successfully");
    } else {
      return res.status(400).json("Member not found in event");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { createEvent, getEvents, getEvent, addMember, removeMember };
