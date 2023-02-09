const Relationships = require("../models/Relationships");
const jwt = require("jsonwebtoken");

const getRelationships = async (req, res) => {
  try {
    const Relationship = await Relationships.findAll({
      where: { followedId: req.query.followedId },
    });
    return res
      .status(200)
      .json(Relationship.map((relation) => relation.followerId));
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const addRelationship = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Relationships.create({
        followerId: userInfo.id,
        followedId: req.query.followedId,
      });
      res.status(200).json("Relationship created successfully.");
    } catch (err) {
      res.status(403).json(err);
    }
  });
};

const deleteRelationship = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Relationships.destroy({
        where: { followerId: userInfo.id, followedId: req.query.followedId },
      });
      res.status(200).json("Relationship deleted successfully.");
    } catch (err) {
      res.status(403).json(err);
    }
  });
};

module.exports = { getRelationships, addRelationship, deleteRelationship };
