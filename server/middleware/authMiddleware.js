// middleware/authMiddleware.js — Protect admin routes with JWT verification
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Middleware to verify JWT from the Authorization header.
 * Expected header: Authorization: Bearer <token>
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized — no token provided' });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach admin info to request object (excluding passwordHash)
    req.admin = await Admin.findById(decoded.id).select('-passwordHash');

    if (!req.admin) {
      return res.status(401).json({ message: 'Not authorized — admin not found' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized — invalid token' });
  }
};

module.exports = { protect };
