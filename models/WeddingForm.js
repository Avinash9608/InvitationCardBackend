const mongoose = require("mongoose");

// Define the schema for the wedding form
const weddingFormSchema = new mongoose.Schema({
  brideName: { type: String, required: true },
  groomName: { type: String, required: true },
  brideImageUrl: { type: String, required: true },
  groomImageUrl: { type: String, required: true },
  weddingDate: { type: Date, required: true },
  weddingLocation: { type: String, required: true },
  brideDescription: { type: String, required: true },
  groomDescription: { type: String, required: true },

  eventDetails: [
    {
      type: { type: String, required: true }, // Type of party (e.g., ceremony, reception, etc.)
      title: { type: String, required: true },
      timeStart: { type: String, required: true }, // Start time as String
      timeEnd: { type: String, required: true }, // End time as String
      date: { type: String, required: true }, // Date as String
      description: { type: String, required: true },
    },
  ],

  storyDetails: [
    {
      title: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true }, // Image URL or path
    },
  ],

  galleryData: [
    {
      image: { type: String, required: true },
      photosCount: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
});

// Create the model from the schema
const WeddingForm = mongoose.model("WeddingForm", weddingFormSchema);

module.exports = WeddingForm;
