// controllers/galleryController.js — Gallery image management
const GalleryItem = require('../models/GalleryItem');

/**
 * @route   GET /api/gallery
 * @desc    Get all gallery items (supports ?album= filter)
 * @access  Public
 */
const getGalleryItems = async (req, res, next) => {
  try {
    const { album } = req.query;
    const filter = album ? { albumName: album } : {};
    const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/gallery
 * @desc    Add a new gallery item (admin only)
 * @access  Protected
 */
const addGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/gallery/:id
 * @desc    Update a gallery item (admin only)
 * @access  Protected
 */
const updateGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/gallery/:id
 * @desc    Remove a gallery item (admin only)
 * @access  Protected
 */
const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ success: true, message: 'Gallery item removed' });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/gallery/albums
 * @desc    Get distinct album names
 * @access  Public
 */
const getAlbums = async (req, res, next) => {
  try {
    const albums = await GalleryItem.distinct('albumName');
    res.json({ success: true, data: albums });
  } catch (error) {
    next(error);
  }
};

module.exports = { getGalleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem, getAlbums };
