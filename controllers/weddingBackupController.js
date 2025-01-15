const BackupWeddingForm = require("../models/backupingmodel");

const { body, validationResult } = require("express-validator");
//Controller to get all backup wedding records
exports.getAllBackups = async (req, res) => {
  try {
    const { weddingId } = req.params; // Use 'weddingId' instead of 'id'
    if (!weddingId) {
      return res.status(400).json({ message: "Wedding ID is required" });
    }
    if (!weddingId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid wedding ID format" });
    }
    const backups = await BackupWeddingForm.find({ weddingId: weddingId }); // Correctly query by weddingId
    if (!backups || backups.length === 0) {
      return res
        .status(404)
        .json({ message: "No backups found for this wedding" });
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
