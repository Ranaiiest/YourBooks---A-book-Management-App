const mongoose = require('mongoose');

// Define User schema with name, email, password, timestamps
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // Unique email
  password: { type: String, required: true } // Hashed password
}, { timestamps: true }); // Adds createdAt and updatedAt

// Export the model
module.exports = mongoose.model('User', UserSchema);
