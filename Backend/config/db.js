const mongoose = require('mongoose');

let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  if (!cachedPromise) {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/booklib';
    cachedPromise = mongoose
      .connect(mongoURI)
      .then((conn) => {
        console.log('MongoDB connected successfully');
        return conn;
      })
      .catch((error) => {
        cachedPromise = null;
        console.error('MongoDB connection error:', error.message);
        if (!process.env.VERCEL) {
          process.exit(1);
        }
        throw error;
      });
  }

  await cachedPromise;
};

module.exports = connectDB;
