const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booklib';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
// here the connectDB function establishes a connection to the MongoDB database
// using the connection string specified in the MONGODB_URI environment variable
// or defaults to a local MongoDB instance if not provided.
// it uses mongoose.connect method with options to handle deprecation warnings
// and logs a success message upon successful connection
// or logs an error message and exits the process if the connection fails.

module.exports = connectDB;
