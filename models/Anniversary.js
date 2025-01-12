const mongoose = require("mongoose");

const AnniversaryInvitationSchema = new mongoose.Schema({
  celebrantNames: {
    type: String,
    required: true,
  },
  anniversaryType: {
    type: String,
    required: true,
    enum: ["Wedding", "Dating", "Other"],
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: String,
  },
});

const AnniversaryInvitation = mongoose.model(
  "AnniversaryInvitation",
  AnniversaryInvitationSchema
);

module.exports = AnniversaryInvitation;
