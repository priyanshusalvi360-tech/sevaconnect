// controllers/contactController.js — Contact inquiry management
const Contact = require('../models/Contact');

/**
 * @route   POST /api/contacts
 * @desc    Submit a contact inquiry
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    const inquiry = await Contact.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly!',
      data: { id: inquiry._id },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(error);
  }
};

/**
 * @route   GET /api/contacts
 * @desc    Get all contact inquiries (admin only, supports ?status= filter)
 * @access  Protected
 */
const getContacts = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/contacts/:id/status
 * @desc    Update inquiry status (admin only)
 * @access  Protected
 */
const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete a contact inquiry (admin only)
 * @access  Protected
 */
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getContacts, updateContactStatus, deleteContact };
