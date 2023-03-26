const { Events, User, Plans, Payments, Expenses, Rooms } = require("../models");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const axios = require("axios");

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
        });
        const currentEvent = await Events.findOne({
          where: { host: userInfo.id },
        });
        await Rooms.create({
          event_id: currentEvent.id,
          members: currentEvent.members,
        });
        return res.status(200).json("Event created successfully.");
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
    await Rooms.update(
      { members: members },
      { where: { event_id: req.query.eventId } }
    );
    return res.status(200).json("Member added successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await Rooms.findOne({
      where: { id: req.query.roomId },
    });
    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json(error);
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

const addPlan = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Plans.create({
        plan_date: req.body.date,
        plan_note: req.body.note,
        eventId: req.query.eventId,
      });
      return res.status(200).json("Plan added");
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

const getPlans = async (req, res) => {
  try {
    const plan = await Plans.findAll({
      where: { eventId: req.query.eventId },
      order: [["plan_date", "ASC"]],
    });
    return res.status(200).json(plan);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updatePlan = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Plans.update(
        {
          plan_note: req.body.note,
        },
        { where: { id: req.query.planId } }
      );
      return res.status(200).json("Updated");
    } catch (error) {
      return res.status(500).json("Could not be updated.");
    }
  });
};

const makePayment = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");

    let data = {
      token: `${req.body.token}`,
      amount: req.body.amount,
    };

    let config = {
      headers: {
        Authorization: "Key test_secret_key_f05764f1cd744fc19be179f315d8e62a",
      },
    };

    try {
      const response = await axios.post(
        "https://khalti.com/api/v2/payment/verify/",
        data,
        config
      );
      await Payments.create({
        event_id: req.query.eventId,
        user_id: userInfo.id,
        amount: req.body.amount,
      });
      return res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
};

const addExpense = async (req, res) => {
  try {
    await Expenses.create({
      expense_title: req.body.title,
      amount: req.body.amount,
      remarks: req.body.remarks,
      event_id: req.query.eventId,
    });
    return res.status(200).json("Expense Added Successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expenses.destroy({
      where: {
        id: req.query.expenseId,
      },
    });
    return res.status(200).json("Expense has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getExpenses = async (req, res) => {
  try {
    const expense = await Expenses.findAll({
      where: { event_id: req.query.eventId },
    });
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  createEvent,
  getEvents,
  getEvent,
  addMember,
  getMembers,
  removeMember,
  addPlan,
  getPlans,
  updatePlan,
  makePayment,
  addExpense,
  deleteExpense,
  getExpenses,
};
