const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
