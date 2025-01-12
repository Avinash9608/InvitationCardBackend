const Template = require("../models/Template");

// Create a new template
const createTemplate = async (req, res) => {
  try {
    const template = new Template(req.body);
    const savedTemplate = await template.save();
    res.status(201).json(savedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all templates
const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatedTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTemplate = await Template.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: "Failed to update template", error });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting template with ID: ${id}`);

    const deletedTemplate = await Template.findByIdAndDelete(id);

    if (!deletedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ message: "Failed to delete template", error });
  }
};
module.exports = {
  createTemplate,
  getTemplates,
  updatedTemplate,
  deleteTemplate,
};
