const db = require("../config/database");
const users = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//registering user
const register = async (req, res) => {
  //check if user exists
  const user = await users.findOne({ where: { email: req.body.email } });
  if (!user) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //creating new users
    await users
      .create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      })
      .then(() => res.status(200).json("User has been created."))
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
  const user = await users.findOne({ where: { email: req.body.email } });
  if (!user) {
    res.status(404).json("User not found");
  } else {
    //comparing password
    const passwordCheck = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordCheck) {
      res.status(400).json("Wrong password");
    } else {
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

module.exports = { register, login, logout };
