const { User, Feedbacks, Notifications } = require("../models");
const jwt = require("jsonwebtoken");

const addFeedback = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User is not logged in.");
  jwt.verify(token, "secretKey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    try {
      await Feedbacks.create({
        user_id: userInfo.id,
        event_id: req.body.eventId,
        feedback: req.body.feedback,
      });

      const { eventId, feedback, event, ...others } = req.body;

      console.log(others);

      Object.keys(others).forEach(async (key) => {
        const user = await User.findOne({ where: { id: key } });
        console.log(user);
        const score = user.travelScore;
        const rate = others[key];
        console.log(score, rate);
        await User.update(
          {
            travelScore: (score + rate) / (user.ratingCount + 1),
            ratingCount: user.ratingCount + 1,
          },
          {
            where: {
              id: user.id,
            },
          }
        );
        await Notifications.destroy({
          where: {
            to: userInfo.id,
            type: "feedback",
          },
        });
      });
      return res.status(200).json("Feedback submitted");
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

module.exports = addFeedback;
