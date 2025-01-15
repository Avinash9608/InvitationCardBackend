// models/WeddingInterested.js
const mongoose = require("mongoose");

const UserAttendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserAttendance = mongoose.model("UserAttendance", UserAttendanceSchema);

module.exports = UserAttendance;
