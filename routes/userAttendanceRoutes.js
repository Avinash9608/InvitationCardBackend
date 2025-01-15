// routes/userAttendanceRoutes.js
const express = require("express");
const router = express.Router();
const {
  addAttendance,
  getAllAttendance,
} = require("../controllers/userAttendanceController");

// POST: Add attendance
router.post("/", addAttendance);

// GET: Fetch all attendance records
router.get("/", getAllAttendance);

module.exports = router;
