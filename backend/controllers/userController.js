const User = require("../models/userModel");

// login user
const loginUser = async (req, res) => {
  res.json({ msg: "login user" });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // creates a new user document for the person attempting to sign up with this email
    const user = await User.signup(email, password);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // res.json({ msg: "signup user" });
};

module.exports = { loginUser, signupUser };
