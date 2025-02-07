const express = require("express");
const router = express.Router();
const {
  submitEnquiry,
  getAllEnquiries,
} = require("../controllers/UserEnqueryController");

// Route to submit an enquiry
router.post("/", submitEnquiry);

// Route to get all enquiries (Optional: For admin purposes)
router.get("/", getAllEnquiries);

module.exports = router;
