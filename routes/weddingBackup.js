const express = require("express");
const router = express.Router();
const weddingBackupController = require("../controllers/weddingBackupController");
// Define route for fetching all backup wedding records (Backup specific route)
router.get("/", weddingBackupController.getAllBackups);

module.exports = router;
