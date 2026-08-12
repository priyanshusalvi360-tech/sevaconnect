// models/GalleryItem.js — Mongoose schema for Gallery Images
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [300, 'Caption cannot exceed 300 characters'],
    },
    albumName: {
      type: String,
      trim: true,
      default: 'General',
    },
    eventDate: {
      type: Date,
    },
    order: {
      type: Number,
      default: 0, // For manual sorting within an album
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
