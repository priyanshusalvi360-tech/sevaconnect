// controllers/volunteerController.js — Volunteer registration management
const Volunteer = require('../models/Volunteer');

/**
 * @route   POST /api/volunteers
 * @desc    Submit a volunteer registration
 * @access  Public
 */
const registerVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Thank you for registering! We will contact you soon.',
      data: { id: volunteer._id, fullName: volunteer.fullName },
    });
  } catch (error) {
    // Handle mongoose validation errors gracefully
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(error);
  }
};

/**
 * @route   GET /api/volunteers
 * @desc    Get all volunteer registrations (admin only, supports ?status= filter)
 * @access  Protected
 */
const getVolunteers = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const volunteers = await Volunteer.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: volunteers.length, data: volunteers });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/volunteers/:id/status
 * @desc    Update a volunteer's status (admin only)
 * @access  Protected
 */
const updateVolunteerStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json({ success: true, data: volunteer });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/volunteers/:id
 * @desc    Delete a volunteer record (admin only)
 * @access  Protected
 */
const deleteVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json({ success: true, message: 'Volunteer record deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerVolunteer, getVolunteers, updateVolunteerStatus, deleteVolunteer };
