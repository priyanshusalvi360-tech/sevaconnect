// models/Volunteer.js — Mongoose schema for Volunteer Registrations
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [16, 'Volunteer must be at least 16 years old'],
      max: [80, 'Age must be realistic'],
    },
    areaOfInterest: {
      type: String,
      required: [true, 'Area of interest is required'],
      enum: [
        'education',
        'health',
        'environment',
        'women-empowerment',
        'child-welfare',
        'rural-development',
        'fundraising',
        'social-media',
        'other',
      ],
    },
    availability: {
      type: String,
      required: [true, 'Availability is required'],
      enum: ['weekdays', 'weekends', 'both', 'flexible'],
    },
    message: {
      type: String,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    // Admin can update this to track follow-up
    status: {
      type: String,
      enum: ['new', 'contacted', 'active', 'inactive'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
