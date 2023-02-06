const users = require("..//models/User");
const interests = require("../models/Interests");
const userinterest = require("../models/userInterest");

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
    console.log(err);
    return res.status(400).json(err);
  }
};

module.exports = { getUser };
