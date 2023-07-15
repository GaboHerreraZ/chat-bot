const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  date: Date,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
