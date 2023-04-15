const { User, Admin, Events, Notifications } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//registering user
const register = async (req, res) => {
  //check if user exists
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //creating new User
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      address: req.body.address,
    })
      .then(() => res.status(200).json("User has been created"))
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(409).json("User already exists");
  }
};

//User login
const login = async (req, res) => {
  //checking for email
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    res.status(404).json("User not found");
  } else {
    //comparing password
    const passwordCheck = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordCheck) {
      res.status(400).json("Wrong password");
    } else {
      const userEvent = await Events.findOne({
        where: {
          host: user.id,
          completionStatus: "running",
        },
      });
      if (userEvent) {
        if (moment(userEvent.endDate).isBefore(moment(), "day")) {
          await Events.update(
            {
              completionStatus: "completed",
            },
            {
              where: {
                id: userEvent.id,
              },
            }
          );
          userEvent.members.forEach(async (member) => {
            await Notifications.create({
              to: member,
              event: userEvent.id,
              status: "unread",
              type: "feedback",
            });
          });
        }
      }
      const token = jwt.sign({ id: user.id }, "secretKey");
      const { password, ...others } = user.dataValues;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    }
  }
};

//logout
const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User logged out");
};

const adminLogin = async (req, res) => {
  //checking for email
  // const user = await Admin.findOne({ where: { email: req.body.email } });
  if (req.body.email !== "admin") {
    res.status(404).json("User not found");
  } else {
    //comparing password
    // const passwordCheck = bcrypt.compareSync(req.body.password, user.password);
    if (req.body.password !== "admin") {
      res.status(400).json("Wrong password");
    } else {
      const token = jwt.sign({ id: req.query.email }, "secretKey");
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(req.body.email);
    }
  }
};

module.exports = { register, login, logout, adminLogin };
