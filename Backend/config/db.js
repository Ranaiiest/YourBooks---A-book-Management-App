const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use 'booklib' as the database name here
    await mongoose.connect('mongodb://localhost:27017/booklib', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectDB;
