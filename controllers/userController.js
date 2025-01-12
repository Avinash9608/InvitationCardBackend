const bcrypt = require("bcrypt");
const User = require("../models/User");
const dotenv = require("dotenv");
const crypto = require("crypto"); // Import crypto for OTP generation
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Import nodemailer for email sending
dotenv.config();

// @desc Get all users
// @route GET /api/users
// @access Public
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

// @desc Add a new user
// @route POST /api/users
// @access Public
const addUser = async (req, res) => {
  const { name, email, subscriptionType, isActive } = req.body;
  try {
    const user = new User({ name, email, subscriptionType, isActive });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add user", error: error.message });
  }
};

// @desc Get a single user by ID
// @route GET /api/users/:id
// @access Public
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// @desc Update a user
// @route PUT /api/users/:id
// @access Public
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Public
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("register", req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User  already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("login", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

    // Set OTP and expiry time (1 hour)
    user.otp = otp;
    user.otpExpiry = Date.now() + 3600000; // OTP expires in 1 hour

    await user.save();

    // Create a transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .send({ message: "Error sending email", error: error.message });
      }
      res.status(200).send({ message: "OTP sent to email" });
    });
  } catch (error) {
    console.error("Error during forgot password:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  console.log("reset ", req.body);
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User     not found" });
    }

    // Check if OTP matches and hasn't expired
    if (user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }

    // Check if new password is the same as the old password
    const isMatch = await user.comparePassword(newPassword);
    if (isMatch) {
      return res
        .status(400)
        .send({ message: "New password is the same as the old password" });
    }

    // Hash the new password and update the user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { email },
      { $set: { password: hashedPassword, otp: null, otpExpiry: null } }
    );

    res.status(200).send({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Error during reset password:", error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
