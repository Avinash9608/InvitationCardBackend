const UserEnquiry = require("../models/UserEnquiryModel");

// Submit an enquiry
const submitEnquiry = async (req, res) => {
  try {
    const { name, email, message, sendCopy } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEnquiry = new UserEnquiry({ name, email, message, sendCopy });
    await newEnquiry.save();

    return res
      .status(201)
      .json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all enquiries (Admin use)
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await UserEnquiry.find().sort({ createdAt: -1 });
    return res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { submitEnquiry, getAllEnquiries };
