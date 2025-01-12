const express = require("express");
const router = express.Router();
const WeddingInvitationController = require("../controllers/WeddingInvitationController");

// POST route to save wedding invitation data
router.post("/save-invitations", WeddingInvitationController.saveInvitation);
// GET route to fetch wedding invitations
router.get("/save-invitations", WeddingInvitationController.getInvitations);
// DELETE route to delete a wedding invitation
router.delete(
  "/delete-invitation/:id",
  WeddingInvitationController.deleteInvitation
);

module.exports = router;
