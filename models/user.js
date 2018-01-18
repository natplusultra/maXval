const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: { 
    type: String,
    unique: true
  },
  name: { 
    type: String
  },
  email: String,
  image: String,
  gender: String,
  dateJoined: { type: Date }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
