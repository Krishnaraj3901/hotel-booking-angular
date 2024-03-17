//mongodb connection with nodejs

//connection library - mongoose

//import mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/roomBooking");

//model and schema
const User = mongoose.model("User", {
  username: String,
  phno: Number,
  password: String,
});

const Room = mongoose.model("Room", {
  suite_name: String,
  description: String,
  single_image: String,
  services: [String], // An array of strings for services
  rate: {
    nightly: Number,
    weekly: Number,
  },
  roomId: String,
});

const AllRoom = mongoose.model("AllRoom", {
  suite_name: String,
  description: String,
  single_image: String,
  services: [String], // An array of strings for services
  rate: {
    nightly: Number,
    weekly: Number,
  },
  roomId: String,
});

const Booking = mongoose.model("Booking", {
  fullname: String,
  checkin: String,
  checkout: String,
  adult: Number,
  children: Number,
  email: String,
  phno: Number,
  roomId: String,
});

const Confirm = mongoose.model("Confirm", {
  fullname: String,
  checkin: String,
  checkout: String,
  adult: Number,
  children: Number,
  email: String,
  phno: Number,
  roomId: String,
});

const RoomBooked = mongoose.model("RoomBooked", {
  suite_name: String,
  description: String,
  single_image: String,
  services: [String], // An array of strings for services
  rate: {
    nightly: Number,
    weekly: Number,
  },
  checkin: Date,
  checkout: Date,
  roomId: String,
});

module.exports = {
  User,
  Room,
  AllRoom,
  Booking,
  Confirm,
  RoomBooked,
};
