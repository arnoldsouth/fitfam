const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

// create userSchema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    // unique email address signup
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method on its model
// creating a static signup method to create users and add them to the db
// `userSchema.statics` is the same as `User`
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("all fields are required");
  }
  // use validator to check if the email is a valid email
  if (!validator.isEmail(email)) {
    throw Error("please use a valid email");
  }
  //   use validator to check if strong password
  if (!validator.isStrongPassword(password)) {
    throw Error("please choose a stronger password");
  }

  // check if email already exists, send error response
  //   using `this.` to refer to `User` model, but because we're in the model, we use `this.`
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("email is already in use");
  }

  //   create salt to add onto the password and hash it
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //   create a new user document once email is valid, password is strong, and password has been hashed
  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
