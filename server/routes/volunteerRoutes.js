// routes/volunteerRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer,
} = require('../controllers/volunteerController');
const { protect } = require('../middleware/authMiddleware');

// Public route — anyone can submit volunteer registration
router.post('/', registerVolunteer);

// Protected admin routes
router.get('/', protect, getVolunteers);
router.put('/:id/status', protect, updateVolunteerStatus);
router.delete('/:id', protect, deleteVolunteer);

module.exports = router;
