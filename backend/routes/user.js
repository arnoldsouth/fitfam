const express = require("express");

// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// POST a user login
router.post("/login", loginUser);

// POST a user signup
router.post("/signup", signupUser);

module.exports = router;
