const WeddingForm = require("../models/WeddingForm");
const BackupWeddingForm = require("../models/backupingmodel");
const { body, validationResult } = require("express-validator");

exports.submitWeddingForm = [
  // Validation rules
  body("brideName").notEmpty().withMessage("Bride's name is required"),
  body("groomName").notEmpty().withMessage("Groom's name is required"),
  body("weddingDate").isDate().withMessage("Wedding date is invalid"),
  body("weddingLocation")
    .notEmpty()
    .withMessage("Wedding location is required"),
  body("brideImageUrl").isURL().withMessage("Invalid image URL for bride"),
  body("groomImageUrl").isURL().withMessage("Invalid image URL for groom"),

  // Validation handler
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if there is existing data in the database
      const existingWedding = await WeddingForm.findOne();

      // If there is existing data, delete it first
      if (existingWedding) {
        const backupWedding = new BackupWeddingForm(existingWedding.toObject());
        await backupWedding.save();
        await WeddingForm.deleteOne({ _id: existingWedding._id });
      }

      // Proceed to insert new data
      const weddingData = req.body;
      const newWedding = new WeddingForm(weddingData);
      const savedWedding = await newWedding.save();

      // Save the backup for the new wedding form
      const backupWedding = new BackupWeddingForm(savedWedding.toObject());
      await backupWedding.save(); // Save the backup

      res.status(201).json({
        message: "Wedding details successfully submitted!",
        data: savedWedding,
      });
    } catch (error) {
      console.error("Error submitting wedding form:", error);
      res
        .status(500)
        .json({ message: "Error saving wedding form", error: error.message });
    }
  },
];

// Controller to fetch all wedding records
exports.getAllWeddings = async (req, res) => {
  try {
    const weddings = await WeddingForm.find();
    res.status(200).json(weddings);
    console.log("getting ", weddings);
  } catch (error) {
    console.error("Error fetching wedding records:", error);
    res.status(500).json({
      message: "Error fetching wedding records",
      error: error.message,
    });
  }
};

// Controller to fetch a specific wedding record by ID ```javascript
exports.getWeddingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid wedding ID format" });
    }

    const wedding = await WeddingForm.findById(id);

    if (!wedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }

    res.status(200).json(wedding);
  } catch (error) {
    console.error("Error fetching wedding by ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching wedding", error: error.message });
  }
};

// Controller to update a wedding record by ID
exports.updateWeddingById = [
  body("brideName")
    .optional()
    .notEmpty()
    .withMessage("Bride's name cannot be empty"),
  body("groomName")
    .optional()
    .notEmpty()
    .withMessage("Groom's name cannot be empty"),
  body("weddingDate")
    .optional()
    .isDate()
    .withMessage("Wedding date is invalid"),
  body("weddingLocation")
    .optional()
    .notEmpty()
    .withMessage("Wedding location is required"),
  body("brideImageUrl")
    .optional()
    .isURL()
    .withMessage("Invalid image URL for bride"),
  body("groomImageUrl")
    .optional()
    .isURL()
    .withMessage("Invalid image URL for groom"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;

      // Check if the ID is valid
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid wedding ID format" });
      }

      const updatedWedding = await WeddingForm.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedWedding) {
        return res.status(404).json({ message: "Wedding not found" });
      }

      res.status(200).json({
        message: "Wedding details successfully updated!",
        data: updatedWedding,
      });
    } catch (error) {
      console.error("Error updating wedding by ID:", error);
      res
        .status(500)
        .json({ message: "Error updating wedding", error: error.message });
    }
  },
];

// Controller to delete a wedding record by ID
exports.deleteWeddingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid wedding ID format" });
    }

    const deletedWedding = await WeddingForm.findByIdAndDelete(id);

    if (!deletedWedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }

    res.status(200).json({
      message: "Wedding details successfully deleted!",
      data: deletedWedding,
    });
  } catch (error) {
    console.error("Error deleting wedding by ID:", error);
    res
      .status(500)
      .json({ message: "Error deleting wedding", error: error.message });
  }
};

//Controller to get all backup wedding records
exports.getAllBackups = async (req, res) => {
  try {
    const { id } = req.params;
    const backups = await BackupWeddingForm.find({ weddingId: id });
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
