const express = require("express");
const app = express();

const https = require("https");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8800;
const db = require("./config/database");

const authRoutes = require("./routes/auth.js");
const cookieParser = require("cookie-parser");


const homeRoutes = require("./routes/home");

const cors = require("cors");

//middlewares
app.use(express.json());
app.use((req, res,next)=>{
  res.header("Access-Control-Allow-Credentials",true)
  next()
})
app.use(cors(
  {origin:"http://localhost:3000"}
));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/",homeRoutes);



app.listen(PORT, () => {
  console.log(`Backend server running at port ${PORT}`);
});
