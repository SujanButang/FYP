const { Notifications } = require("../models");
const jwt = require("jsonwebtoken");

const createNotification = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Notifications.create({
        type: req.body.type,
        from: userInfo.id,
        to: req.body.to,
        post: req.body.postId,
        status: "unread",
      });
      return res.status(200).json("Notification created successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
};

const readNotification = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Notifications.update(
        { status: "read" },
        {
          where: { id: req.query.notificationId },
        }
      );
      return res.status(200).json("Notification updated");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
};

const getNotifications = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      const notifications = await Notifications.findAll({
        // where: { to: userInfo.id },
        order: [["createdAt", "DESC"]],
      });
      if (!notifications) res.status(404).json("No notifications found");
      return res.status(200).json(notifications);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

module.exports = { createNotification, readNotification, getNotifications };
