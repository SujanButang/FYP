const {
  User,
  Interests,
  userInterest,
  Verification,
  Notifications,
} = require("../models");
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
        "status",
        "travelScore",
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
      console.log(error);
      return res.status(500).json(error);
    }
  });
};

const verifyProfile = async (req, res) => {
  try {
    console.log(req.body);
    await Verification.create({
      user_id: req.query.userId,
      documentImageFront: req.body.front,
      documentImageBack: req.body.back,
    });
    await User.update(
      {
        status: "pending",
      },
      { where: { id: req.query.userId } }
    );
    return res.status(200).json("Verification Request Sent");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getVerifications = async (req, res) => {
  try {
    const verifications = await Verification.findAll({
      include: {
        model: User,
        attributes: ["id", "username", "profilePicture"],
      },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(verifications);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    const modifiedUsers = users.map((user) => {
      return {
        ...user.dataValues,
        age: moment().diff(user.birthDate, "years"),
      };
    });
    if (users) return res.status(200).json(modifiedUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
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

const approveUser = async (req, res) => {
  try {
    await User.update(
      {
        status: "verified",
      },
      {
        where: {
          id: req.body.userId,
        },
      }
    );
    await Verification.update(
      {
        status: "approved",
      },
      {
        where: {
          user_id: req.body.userId,
        },
      }
    );
    await Notifications.create({
      to: req.body.userId,
      type: "approved",
      status: "unread",
    });
    return res.status(200).json("User has been verified");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const revokeUser = async (req, res) => {
  try {
    await User.update(
      {
        status: "not verified",
      },
      {
        where: {
          id: req.body.userId,
        },
      }
    );
    await Verification.update(
      {
        status: "revoked",
      },
      {
        where: {
          user_id: req.body.userId,
        },
      }
    );
    await Notifications.create({
      to: req.body.userId,
      type: "revoked",
      status: "unread",
    });

    return res.status(200).json("User has been verified");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  getUsers,
  getAllUsers,
  verifyProfile,
  getVerifications,
  approveUser,
  revokeUser,
};
