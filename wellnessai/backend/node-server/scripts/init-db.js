const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../src/config/database');

async function initializeDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    
    console.log('Database connected successfully!');
    console.log('Database initialization completed.');
    
    // You can add any initial data seeding here if needed
    // For example, creating admin users, default settings, etc.
    
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase();
