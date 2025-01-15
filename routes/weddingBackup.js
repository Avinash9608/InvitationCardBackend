const express = require("express");
const router = express.Router();
const weddingController = require("../controllers/weddingController");
// Define route for fetching all backup wedding records (Backup specific route)
router.get("/", weddingController.getAllBackups);

module.exports = router;
