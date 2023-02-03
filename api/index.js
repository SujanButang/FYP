const express = require("express");
const app = express();

const https = require("https");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const PORT = process.env.PORT || 8800;
const db = require("./config/database");

const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
const commentRoutes = require("./routes/comments.js");

const cookieParser = require("cookie-parser");

const homeRoutes = require("./routes/home");

const cors = require("cors");

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/upload");
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
app.use("/", homeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running at port ${PORT}`);
});
