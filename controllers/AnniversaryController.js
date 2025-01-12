const Invitation = require("../models/Anniversary"); // Assuming this is your Invitation model

// @desc Create a new invitation
// @route POST /api/anniversaryinvitations
// @access Public
exports.createInvitation = async (req, res) => {
  try {
    const {
      celebrantNames,
      anniversaryType,
      venue,
      date,
      time,
      additionalDetails,
    } = req.body;

    // Create a new invitation document
    const newInvitation = new Invitation({
      celebrantNames,
      anniversaryType,
      venue,
      date,
      time,
      additionalDetails,
    });

    const savedInvitation = await newInvitation.save();
    res.status(201).json({
      message: "Invitation created successfully",
      data: savedInvitation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create invitation", error: error.message });
  }
};

// @desc Get all invitations
// @route GET /api/anniversaryinvitations
// @access Public
exports.getAllInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find();
    if (invitations.length === 0) {
      return res.status(404).json({ message: "No invitations found" });
    }
    res.status(200).json({ data: invitations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch invitations", error: error.message });
  }
};

// @desc Delete an invitation by ID
// @route DELETE /api/anniversaryinvitations/:id
// @access Public
exports.deleteInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const invitation = await Invitation.findByIdAndDelete(id);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    res.status(200).json({
      message: "Invitation deleted successfully",
      data: invitation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete invitation", error: error.message });
  }
};
