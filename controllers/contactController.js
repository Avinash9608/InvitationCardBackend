const nodemailer = require("nodemailer");
const Contact = require("../models/contactModel"); // Import the Contact model

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save the contact form data to the database
    const newContact = new Contact({
      name,
      email,
      message,
    });
    await newContact.save();

    // Send the email notification
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Destination email (admin)
      subject: "New Contact Form Submission",
      text: `You have a new message from ${name} (${email}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(200).json({ success: "Message sent and saved successfully" });
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Error processing the message" });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts from the database
    res.status(200).json(contacts); // Send the contacts data as a response
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  const { id } = req.params; // Get contact ID from request parameters

  try {
    const contact = await Contact.findByIdAndDelete(id); // Delete the contact from DB

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ success: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Error deleting contact" });
  }
};

module.exports = { sendContactMessage, getContacts, deleteContact };
