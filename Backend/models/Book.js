const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  author: { type: String },
  genre: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  note: { type: String },          // Added note field for user opinions
  link: { type: String }           // Added link to external book URL
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
