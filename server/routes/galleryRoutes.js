// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getAlbums,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getGalleryItems);
router.get('/albums', getAlbums);

// Protected admin routes
router.post('/', protect, addGalleryItem);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
