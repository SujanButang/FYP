const { Plans, Suggestions, User, Votes } = require("../models");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const getSuggestions = async (req, res) => {
  try {
    const suggestion = await Suggestions.findAll({
      where: { plan_id: req.query.planId },
      include: { model: User, attributes: ["username", "profilePicture"] },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(suggestion);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addSuggestion = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Suggestions.create({
        user_id: userInfo.id,
        suggestion_description: req.body.suggestionDescription,
        plan_id: req.query.planId,
      });
      res.status(200).json("Suggestion created successfully.");
    } catch (err) {
      res.status(403).json(err);
    }
  });
};

const addVote = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Votes.create({
        suggestion_id: req.query.suggestionId,
        status: req.body.status,
        voter_id: userInfo.id,
      });
      res.status(200).json("Vote created successfully.");
    } catch (err) {
      res.status(403).json(err);
    }
  });
};

const removeVote = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      const vote = await Votes.findOne({
        where: { voter_id: userInfo.id, suggestion_id: req.query.suggestionId },
      });
      if (vote.status === "up") {
        await Votes.update(
          {
            status: req.body.status,
          },
          {
            where: {
              voter_id: userInfo.id,
              status: "up",
              suggestion_id: req.query.suggestionId,
            },
          }
        );
        res.status(200).json("Vote created successfully.");
      } else {
        await Votes.update(
          {
            status: req.body.status,
          },
          {
            where: {
              voter_id: userInfo.id,
              status: "down",
              suggestion_id: req.query.suggestionId,
            },
          }
        );
        res.status(200).json("Vote created successfully.");
      }
    } catch (err) {
      res.status(403).json(err);
      console.log(err);
    }
  });
};

const getVotes = async (req, res) => {
  try {
    const vote = await Votes.findAll({
      where: { suggestion_id: req.query.suggestionId },
    });
    return res.status(200).json(vote);
  } catch (error) {
    return res.satus(500).json(error);
  }
};

module.exports = {
  getSuggestions,
  addSuggestion,
  getVotes,
  addVote,
  removeVote,
};
