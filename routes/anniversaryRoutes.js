const express = require("express");
const {
  createInvitation,
  getAllInvitations,
  deleteInvitation,
} = require("../controllers/AnniversaryController");

const router = express.Router();

// POST route to create a new invitation
router.post("/", createInvitation);

// GET route to fetch all invitations
router.get("/", getAllInvitations);

// DELETE route to delete an invitation by ID
router.delete("/:id", deleteInvitation);

module.exports = router;
