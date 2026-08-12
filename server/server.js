// server.js — SevaConnect Express Application Entry Point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Import route modules
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

// ─── Initialize App ────────────────────────────────────────────────────────
const app = express();

// ─── Connect to MongoDB ────────────────────────────────────────────────────
connectDB();

// ─── Security Middleware ───────────────────────────────────────────────────
// helmet sets secure HTTP headers
app.use(helmet());

// CORS — only allow requests from the React client origin
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

// ─── Body Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── HTTP Request Logging (dev only) ──────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ─── Health Check ──────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SevaConnect API is running 🌿' });
});

// ─── API Routes ────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/gallery', galleryRoutes);

// ─── Error Handling Middleware ─────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  SevaConnect server running on http://localhost:${PORT}`);
  console.log(`🌿  Environment: ${process.env.NODE_ENV || 'development'}`);
});
