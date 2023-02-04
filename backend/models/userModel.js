const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);
