const mongoose = require("mongoose");

// Define the schema for the backup wedding form (same as the original schema)
const backupWeddingFormSchema = new mongoose.Schema({
  brideName: { type: String, required: true },
  groomName: { type: String, required: true },
  brideImageUrl: { type: String, required: true },
  groomImageUrl: { type: String, required: true },
  weddingDate: { type: Date, required: true },
  weddingLocation: { type: String, required: true },
  brideDescription: { type: String, required: true },
  groomDescription: { type: String, required: true },

  eventDetails: {
    mainCeremony: {
      title: { type: String, required: true },
      timeStart: { type: String, required: true },
      timeEnd: { type: String, required: true },
      date: { type: String, required: true },
      description: { type: String, required: true },
    },
    weddingParty: {
      title: { type: String, required: true },
      timeStart: { type: String, required: true },
      timeEnd: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String, required: true },
    },
  },

  storyDetails: [
    {
      title: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],

  galleryData: [
    {
      image: { type: String, required: true },
      photosCount: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],

  // Add a field to track the backup date or any identifier for reference
  backupDate: { type: Date, default: Date.now },
});

// Create the model for backup wedding data
const BackupWeddingForm = mongoose.model(
  "BackupWeddingForm",
  backupWeddingFormSchema
);

module.exports = BackupWeddingForm;
