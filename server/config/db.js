// config/db.js — MongoDB connection using Mongoose
const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas or local instance.
 * URI is loaded from environment variables for security.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 8 no longer needs useNewUrlParser / useUnifiedTopology
    });
    console.log(`✅  MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure code so the process restarts cleanly
  }
};

module.exports = connectDB;
