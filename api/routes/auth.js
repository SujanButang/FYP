const express = require("express");
const { register, login, logout, adminLogin } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/admin/login", adminLogin);

module.exports = router;
