// seed/seedAdmin.js — Creates the default admin user in MongoDB
// Run once with: node seed/seedAdmin.js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sevaconnect';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅  Connected to MongoDB');

    // Check if admin already exists
    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      console.log('ℹ️   Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    // Hash the default password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash('Admin@123', salt);

    // Create the default admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@sevaconnect.org',
      passwordHash,
      role: 'superadmin',
    });

    console.log('🌱  Default admin created successfully!');
    console.log('─────────────────────────────────────');
    console.log(`   Username : ${admin.username}`);
    console.log(`   Email    : ${admin.email}`);
    console.log(`   Password : Admin@123`);
    console.log('─────────────────────────────────────');
    console.log('⚠️   IMPORTANT: Change the default password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌  Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
