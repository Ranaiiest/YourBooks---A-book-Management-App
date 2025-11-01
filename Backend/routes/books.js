const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Book = require('../models/Book');

// Other CRUD routes...

// @route   POST /api/books
// @desc    Add a new book
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, author, genre, rating, note, link } = req.body;
  try {
    const newBook = new Book({
      user: req.user,
      title,
      author,
      genre,
      rating,
      note,
      link,
    });
    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// @route   GET /api/books
// @desc    Get all books for logged-in user, with optional query by _id
// @access  Private
router.get('/', auth, async (req, res) => {
  const { search, genre, _id } = req.query;
  let filter = { user: req.user };
  if (genre) filter.genre = genre;
  if (search) filter.title = { $regex: search, $options: 'i' };
  if (_id) filter._id = _id; // allow to fetch single book by id (for BookForm edit)
  try {
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete book by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    if (book.user.toString() !== req.user) return res.status(401).json({ msg: 'Not authorized' });
    await book.deleteOne(); // delete correctly for Mongoose >= 6
    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// @route   PUT /api/books/:id
// @desc    Update book by id
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, author, genre, rating, note, link } = req.body;
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    if (book.user.toString() !== req.user) return res.status(401).json({ msg: 'Not authorized' });

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.rating = rating || book.rating;
    book.note = note || book.note;
    book.link = link || book.link;

    await book.save();

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
