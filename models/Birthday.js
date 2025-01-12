const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  place: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

const Invitation = mongoose.model("Invitation", invitationSchema);
module.exports = Invitation;
