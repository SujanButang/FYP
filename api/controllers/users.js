const users = require("..//models/User");
const interests = require("../models/Interests");
const userinterest = require("../models/userInterest");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const user = await users.findAll({
      where: { id: req.params.userId },
      attributes: [
        "username",
        "email",
        "birthDate",
        "address",
        "phone",
        "profilePicture",
        "coverPicture",
      ],
      include: {
        model: userinterest,
        include: { model: interests, attributes: ["interestName"] },
        attributes: ["id"],
      },
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updateUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await users.update(
        {
          username: req.body.username,
          email: req.body.email,
          birthDate: req.body.birthDate,
          address: req.body.address,
          phone: req.body.phone,
          profilePicture: req.body.profilePicture,
          coverPicture: req.body.coverPicture,
        },
        { where: { id: userInfo.id } }
      );
      return res.status(200).json("User details updated successfully.");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
};

module.exports = { getUser, updateUser };
