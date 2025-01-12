// models/WeddingInvitation.js

const mongoose = require("mongoose");

const weddingInvitationSchema = new mongoose.Schema({
  brideName: {
    type: String,
    required: true,
  },
  groomName: {
    type: String,
    required: true,
  },
  weddingDate: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
});

const WeddingInvitation = mongoose.model(
  "WeddingInvitation",
  weddingInvitationSchema
);

module.exports = WeddingInvitation;
