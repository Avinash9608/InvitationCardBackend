const mongoose = require("mongoose");

const UserEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    sendCopy: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserEnquiry = mongoose.model("UserEnquiry", UserEnquirySchema);

module.exports = UserEnquiry;
