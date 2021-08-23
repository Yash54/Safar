const mongoose = require("mongoose");
const db = require("../config/mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile_picture: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// const u1= new User({
//     email: "bat@wayne.com",
//     password: "batman",
//     name: "Bruce",
//     phone_no: 123,
//     address: "abcd",
//     pincode: 1234,
//     city: "Gotham"
// });
// u1.save();

module.exports = User;
