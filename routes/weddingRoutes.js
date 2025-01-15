const express = require("express");
const router = express.Router();
const weddingController = require("../controllers/weddingController");

// Define route for submitting wedding details
router.post("/", weddingController.submitWeddingForm);

// Define route for fetching all wedding records
router.get("/", weddingController.getAllWeddings);

// Define route for fetching a specific wedding record by ID
router.get("/:id", weddingController.getWeddingById);

// Define route for updating a wedding record by ID
router.put("/:id", weddingController.updateWeddingById);

// Define route for deleting a wedding record by ID
router.delete("/:id", weddingController.deleteWeddingById);

// Define route for fetching all backup wedding records (Backup specific route)
router.get("/backups/:weddingId", weddingController.getAllBackups);
module.exports = router;
