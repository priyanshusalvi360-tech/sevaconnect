// controllers/authController.js — Admin login/logout logic
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Generate a signed JWT token for an admin.
 * @param {string} id — MongoDB ObjectId of the admin
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate admin and return JWT token
 * @access  Public
 */
const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find admin by username (case-insensitive due to lowercase: true in schema)
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare submitted password with stored hash
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in admin profile
 * @access  Protected (requires JWT)
 */
const getMe = async (req, res) => {
  // req.admin is set by the protect middleware
  res.json({
    success: true,
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
};

module.exports = { loginAdmin, getMe };
