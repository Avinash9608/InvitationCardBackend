const express = require("express");
const User = require("../models/User");
const verifyToken = require("../config/authMiddleware");
const {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const verifyToken = require("../config/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, subscriptionType, isActive } = req.body;
    const newUser = new User({ name, email, subscriptionType, isActive });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// User login
router.get("/login", (req, res) => {
  res.send("login page");
});
router.post("/login", loginUser);

// User registration
router.get("/register", (req, res) => {
  res.send("register page");
});
router.post("/register", registerUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// User profile (protected route)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ email: { $exists: true } });
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const previousMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    let percentageIncrease = 0;
    if (previousMonthUsers > 0) {
      percentageIncrease =
        ((totalUsers - previousMonthUsers) / previousMonthUsers) * 100;
    }

    res.status(200).json({
      totalUsers,
      percentageIncrease: percentageIncrease.toFixed(2),
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/active-users", async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Count users who have registered in the past month (based on createdAt)
    const activeUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo }, // Checking the 'createdAt' field instead of 'lastLogin'
    });

    console.log("Active users registered in last 30 days: ", activeUsers);
    res.status(200).json({ activeUsers });
  } catch (error) {
    console.error("Error fetching active users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/subscription", async (req, res) => {
  try {
    const users = await User.find({}, "email subscriptionType");
    console.log("Subscription data", users); // Logging for debugging
    res.json(users); // Correct method to send JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/admin-dashboard", verifyToken, (req, res) => {
  // Only authenticated users with valid JWT will reach here
  if (req.user.role === "admin") {
    res.json({ message: "Welcome to the admin dashboard" });
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Insufficient permissions." });
  }
});

// Superadmin Dashboard Route
router.get("/superadmin-dashboard", verifyToken, (req, res) => {
  // Only superadmin users can access this route
  if (req.user.role === "superadmin") {
    res.json({ message: "Welcome to the superadmin dashboard" });
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Insufficient permissions." });
  }
});
module.exports = router;
