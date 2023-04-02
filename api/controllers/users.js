const { User, Interests, userInterest } = require("../models");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { Op } = require("sequelize");

const getUser = async (req, res) => {
  try {
    const user = await User.findAll({
      where: { id: req.params.userId },
      attributes: [
        "id",
        "username",
        "email",
        "birthDate",
        "address",
        "phone",
        "profilePicture",
        "coverPicture",
      ],
      include: {
        model: userInterest,
        include: { model: Interests, attributes: ["interestName"] },
        attributes: ["id"],
      },
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getUsers = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");

    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
        where: {
          id: {
            [Op.ne]: userInfo.id,
          },
        },
      });
      const modifiedUsers = users.map((user) => {
        return {
          ...user.dataValues,
          age: moment().diff(user.birthDate, "years"),
        };
      });
      return res.status(200).json(modifiedUsers);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

const updateUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await User.update(
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

module.exports = { getUser, updateUser, getUsers };
