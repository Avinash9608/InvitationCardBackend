const BackupWeddingForm = require("../models/backupingmodel");

const { body, validationResult } = require("express-validator");
//Controller to get all backup wedding records
// Controller to get all backup wedding records (no weddingId needed)
exports.getAllBackups = async (req, res) => {
  try {
    const backups = await BackupWeddingForm.find(); // Fetch all backups without filtering by weddingId
    if (!backups || backups.length === 0) {
      return res.status(404).json({ message: "No backups found" });
    }
    res.status(200).json(backups);
  } catch (error) {
    console.error("Error fetching backup wedding records:", error);
    res.status(500).json({
      message: "Error fetching backup wedding records",
      error: error.message,
    });
  }
};
