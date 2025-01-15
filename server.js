const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const templateRoutes = require("./routes/templateRoutes");
const userRoutes = require("./routes/userRoutes");
const weddingInvitationRoutes = require("./routes/weddingInvitationRoutes");
const birthdayRoutes = require("./routes/birthdayRoutes");
const invitationRoutes = require("./routes/anniversaryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const weddingRoutes = require("./routes/weddingRoutes");
const weddingBackupRoutes = require("./routes/weddingBackup");
const userAttendanceRoutes = require("./routes/userAttendanceRoutes");
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const corsOptions = {
  origin: "*", // Allow requests from your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/users", userRoutes);
// Routes
app.use("/api/templates", templateRoutes);
// Routes

// app.use("/api/invitations", invitationRoutes);
app.use("/save-invitation", weddingInvitationRoutes);
app.use("/api/birthdayinvitation", birthdayRoutes);
// API Routes
app.use("/api/anniversaryinvitations", invitationRoutes);
app.use("/api/contact", contactRoutes);
// Start the server

app.get("/api/invitations-stats", async (req, res) => {
  try {
    // Assuming you have the necessary models imported
    const WeddingInvitation = require("./models/WeddingInvitation");
    const BirthdayInvitation = require("./models/Birthday");
    const AnniversaryInvitation = require("./models/Anniversary");

    // Aggregate stats for Wedding Invitations
    const weddingStats = await WeddingInvitation.aggregate([
      { $group: { _id: "Wedding Invitations", count: { $sum: 1 } } },
    ]);

    // Aggregate stats for Birthday Invitations
    const birthdayStats = await BirthdayInvitation.aggregate([
      { $group: { _id: "Birthday Invitations", count: { $sum: 1 } } },
    ]);

    // Aggregate stats for Anniversary Invitations
    const anniversaryStats = await AnniversaryInvitation.aggregate([
      { $group: { _id: "Anniversary Invitations", count: { $sum: 1 } } },
    ]);

    // Combine all stats
    const invitationStats = [
      ...weddingStats,
      ...birthdayStats,
      ...anniversaryStats,
    ];

    // Calculate total invitations
    const totalInvitations =
      (await WeddingInvitation.countDocuments()) +
      (await BirthdayInvitation.countDocuments()) +
      (await AnniversaryInvitation.countDocuments());

    const response = {
      totalInvitations,
      invitationStats,
    };

    console.log("totalInvitations ", totalInvitations);
    console.log("invitationStats ", invitationStats);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching invitation stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/wedding", weddingRoutes);
app.use("/api/backups", weddingBackupRoutes);
app.use("/api/attendance", userAttendanceRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
