const express = require("express");
const {
  createTemplate,
  getTemplates,
  updatedTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

const router = express.Router();

router.post("/", createTemplate); // Create a new template
router.get("/", getTemplates); // Get all templates
router.put("/:id", updatedTemplate);
router.delete("/:id", deleteTemplate);
module.exports = router;
