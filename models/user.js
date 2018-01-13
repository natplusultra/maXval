const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  UserId: { type: String},
  email: String,
  gender: String,
  dateJoined: { type: Date }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
