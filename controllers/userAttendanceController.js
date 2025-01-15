// controllers/userAttendanceController.js
const UserAttendance = require("../models/WeddingInterested");

// Add attendance
const addAttendance = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const newAttendance = new UserAttendance({
      name,
      email,
    });

    await newAttendance.save();
    res.status(201).json({ message: "Attendance recorded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await UserAttendance.find().sort({ date: -1 });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addAttendance, getAllAttendance };
