const Invitation = require("../models/Birthday"); // Assuming you have an Invitation model

const saveInvitation = async (req, res) => {
  console.log("Save Invitation");
  console.log("Request Body:", req.body); // Log the incoming request body
  try {
    const { name, time, date, place, address, contact } = req.body;

    // Validate required fields and formats
    if (!name || !time || !date || !place || !address || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate contact number format
    if (!/^\d+$/.test(contact)) {
      return res.status(400).json({ message: "Invalid contact number format" });
    }

    // Create a new invitation document
    const newInvitation = new Invitation({
      name,
      time,
      date,
      place,
      address,
      contact,
    });

    // Save the invitation to the database
    const savedInvitation = await newInvitation.save();
    res.status(201).json({
      message: "Invitation saved successfully",
      savedInvitation: savedInvitation._id, // return only the ID for simplicity
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving invitation", error: error.message });
  }
};

const getInvitations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination params
    const skip = (page - 1) * limit;

    const invitations = await Invitation.find().skip(skip).limit(Number(limit));

    res.status(200).json(invitations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching invitations", error: error.message });
  }
};

const deleteInvitation = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({ message: "Invitation ID is required" });
    }

    // Find and delete the invitation
    const deletedInvitation = await Invitation.findByIdAndDelete(id);

    if (!deletedInvitation) {
      return res
        .status(404)
        .json({ message: "Invitation not found for deletion" });
    }

    res.status(200).json({
      message: "Invitation deleted successfully",
      deletedInvitationId: deletedInvitation._id, // Return only ID of deleted invitation
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting invitation", error: error.message });
  }
};

module.exports = { saveInvitation, getInvitations, deleteInvitation };
