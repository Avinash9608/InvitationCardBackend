const express = require("express");
const router = express.Router();
const BirthdayController = require("../controllers/BirthdayController");

// Corrected POST route to save birthday invitation data
// router.post("/save-birthdayinvitation", BirthdayController.saveInvitation);
router.post("/", BirthdayController.saveInvitation);

// Corrected GET route to fetch birthday invitations
router.get("/", BirthdayController.getInvitations);

// Corrected DELETE route to delete a birthday invitation
router.delete("/:id", BirthdayController.deleteInvitation);

module.exports = router;
