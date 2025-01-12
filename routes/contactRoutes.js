const express = require("express");
const {
  sendContactMessage,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.post("/", sendContactMessage);
router.get("/", getContacts);
// DELETE route to delete a contact by ID
router.delete("/:id", deleteContact);
module.exports = router;
