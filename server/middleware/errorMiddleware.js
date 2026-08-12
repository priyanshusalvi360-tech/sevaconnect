// middleware/errorMiddleware.js — Centralized Express error handler
/**
 * 404 handler — catches requests that didn't match any route
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global error handler — receives errors passed via next(error)
 * Returns a consistent JSON error shape regardless of the error source.
 */
const errorHandler = (err, req, res, next) => {
  // If response status is still 200, downgrade to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only expose stack trace in development
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = { notFound, errorHandler };
