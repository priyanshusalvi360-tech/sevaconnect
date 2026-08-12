// models/Project.js — Mongoose schema for NGO Projects/Campaigns
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    shortDescription: {
      type: String,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'education',
        'health',
        'environment',
        'women-empowerment',
        'child-welfare',
        'rural-development',
        'other',
      ],
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'ongoing',
    },
    images: [
      {
        url: { type: String },
        caption: { type: String },
      },
    ],
    // Impact metrics shown on the project detail page
    impactMetrics: [
      {
        label: { type: String },  // e.g. "Beneficiaries Reached"
        value: { type: String },  // e.g. "5,000+"
      },
    ],
    featured: {
      type: Boolean,
      default: false, // Featured projects appear on the Home page
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
