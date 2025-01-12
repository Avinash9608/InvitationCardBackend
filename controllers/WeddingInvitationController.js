const WeddingInvitation = require("../models/WeddingInvitation");

const saveInvitation = async (req, res) => {
  try {
    const { brideName, groomName, weddingDate, venue, contactNumber } =
      req.body;
    const newInvitation = new WeddingInvitation({
      brideName,
      groomName,
      weddingDate,
      venue,
      contactNumber,
    });
    await newInvitation.save();
    res.status(201).json({ message: "Wedding invitation saved successfully!" });
  } catch (error) {
    console.error("Error saving wedding invitation:", error);
    res.status(500).json({ message: "Error saving wedding invitation." });
  }
};

// New function to get all wedding invitations
const getInvitations = async (req, res) => {
  try {
    const invitations = await WeddingInvitation.find(); // Fetch all invitations from the database
    res.status(200).json(invitations); // Return invitations as JSON
  } catch (error) {
    console.error("Error fetching invitations:", error);
    res.status(500).json({ message: "Error fetching invitations." });
  }
};

const deleteInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvitation = await WeddingInvitation.findByIdAndDelete(id); // Adjust according to your database schema
    if (deletedInvitation) {
      res.status(200).json({ message: "Invitation deleted successfully!" });
    } else {
      res.status(404).json({ message: "Invitation not found!" });
    }
  } catch (error) {
    console.error("Error deleting invitation:", error);
    res.status(500).json({ message: "Error deleting invitation." });
  }
};

module.exports = { saveInvitation, getInvitations, deleteInvitation };
