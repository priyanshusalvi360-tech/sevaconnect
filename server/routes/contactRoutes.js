// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route — anyone can submit a contact inquiry
router.post('/', submitContact);

// Protected admin routes
router.get('/', protect, getContacts);
router.put('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;
