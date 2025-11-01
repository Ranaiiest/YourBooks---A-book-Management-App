import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/api';
import { motion } from 'framer-motion';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [expandedBookId, setExpandedBookId] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/books', {
        params: { search: searchTerm, genre: genreFilter },
      });
      setBooks(response.data);
    } catch (error) {
      alert('Failed to fetch books. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, [searchTerm, genreFilter]);

  const genres = [...new Set(books.map((book) => book.genre).filter(Boolean))];
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`/books/${id}`);
        fetchBooks();
        if (expandedBookId === id) setExpandedBookId(null);
      } catch {
        alert('Failed to delete book.');
      }
    }
  };

  // Detect dark mode with data-theme attribute
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ margin: '24px auto', fontSize: '2.5rem', textAlign: 'center' }}>My Book Collection</h2>

      <div style={{ marginBottom: 20, display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            maxWidth: 330,
            flexGrow: 1,
            padding: 10,
            fontSize: '1.08rem',
            borderRadius: 8,
            border: '1px solid var(--input-border)',
            textAlign: 'center',
          }}
        />
        <select
          onChange={(e) => setGenreFilter(e.target.value)}
          value={genreFilter}
          style={{
            padding: 10,
            borderRadius: 8,
            border: '1px solid var(--input-border)',
            minWidth: 180,
            fontSize: '1.08rem',
            textAlign: 'center',
          }}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Book grid is now truly centered */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 0vw',
        }}
      >
        {books.length === 0 && <p style={{ width: '100%', textAlign: 'center' }}>No books found.</p>}
        {books.map((book) => (
          <motion.div
            key={book._id}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 8px 32px rgba(50,50,90,0.22)',
            }}
            layout
            style={{
              backgroundColor: 'var(--card-bg)',
              boxShadow: '0 2px 8px rgb(0 0 0 / 0.19)',
              borderRadius: 16,
              padding: '38px 24px',
              cursor: 'pointer',
              width: '100%',
              maxWidth: 420,
              minHeight: 180,
              minWidth: 300,
              justifySelf: 'center',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'box-shadow 0.3s',
              gap: '10px',
            }}
            onClick={() => setExpandedBookId(book._id)}
          >
            <MenuBookIcon style={{ fontSize: 46, color: isDark ? '#3399ff' : '#3b7cc2', marginBottom: 10 }} />
            <h3 style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.44rem', margin: '0 0 8px' }}>
              {book.title}
            </h3>
            <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: 0 }}>
              <strong>Author:</strong> {book.author || 'Unknown'}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal remains themed, centered, and overlays details */}
      <Modal open={!!expandedBookId} onClose={() => setExpandedBookId(null)} closeAfterTransition>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '96vw', sm: 480 },
            bgcolor: isDark ? '#23283c' : '#f7f9fa',
            color: isDark ? '#fafcff' : '#1e242a',
            borderRadius: '18px',
            boxShadow: 30,
            p: 4,
            outline: 'none',
            textAlign: 'center',
          }}
        >
          {(() => {
            const book = books.find((b) => b._id === expandedBookId);
            if (!book) return null;
            return (
              <div>
                <MenuBookIcon style={{ fontSize: 52, color: isDark ? '#3399ff' : '#3b7cc2', marginBottom: 12 }} />
                <h2 style={{ marginBottom: 13, fontWeight: 700, fontSize: '2.05rem' }}>{book.title}</h2>
                <p style={{ marginBottom: 7 }}>
                  <strong>Author:</strong> {book.author}
                </p>
                <p style={{ marginBottom: 7 }}>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p style={{ marginBottom: 7 }}>
                  <strong>Rating:</strong> {book.rating}
                </p>
                <p style={{ marginBottom: 7 }}>
                  <strong>Note:</strong> {book.note || '—'}
                </p>
                {book.link && (
                  <p>
                    <strong>Link:</strong>{' '}
                    <a href={book.link} target="_blank" rel="noopener noreferrer" style={{ color: isDark ? '#70bdff' : '#0066cc' }}>
                      {book.link}
                    </a>
                  </p>
                )}
                <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <button onClick={() => navigate(`/add-book?id=${book._id}`)} style={{ background: '#2196f3' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(book._id)} style={{ background: '#f44336' }}>
                    Delete
                  </button>
                  <button onClick={() => setExpandedBookId(null)} style={{ background: '#222' }}>
                    Close
                  </button>
                </div>
              </div>
            );
          })()}
        </Box>
      </Modal>
      <Fab
        color="primary"
        aria-label="add"
        size="large"
        style={{ position: 'fixed', bottom: 34, right: 34, zIndex: 1300 }}
        onClick={() => navigate('/add-book')}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Dashboard;
