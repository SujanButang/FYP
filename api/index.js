const express = require("express");
const app = express();

const path = require("path");

const https = require("https");
const fs = require("fs");
const multer = require("multer");

const PORT = process.env.PORT || 8800;

const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
const commentRoutes = require("./routes/comments.js");
const likeRoutes = require("./routes/likes.js");
const profileRoutes = require("./routes/profile.js");
const relationshipRoutes = require("./routes/relationships.js");
const chatRoutes = require("./routes/chat.js");
const messageRoutes = require("./routes/messages.js");
const eventRoutes = require("./routes/events");
const notificationRoutes = require("./routes/notifications");
const suggestionRoutes = require("./routes/suggestions.js");
const adminRoutes = require("./routes/admin.js");
const hotelRoutes = require("./routes/hotels");
const feedbackRoutes = require("./routes/feedback.js");
const cookieParser = require("cookie-parser");

// const homeRoutes = require("./routes/home");

const cors = require("cors");

//middlewares

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const allowedOrigin = ["http://localhost:3000", "http://localhost:3001"];
app.use(cors({ origin: allowedOrigin }));
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/upload");
    cb(null, "../admin/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
// app.use("/", homeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running at port ${PORT}`);
});
