import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/api';

const useQuery = () => new URLSearchParams(useLocation().search);

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    rating: '',
    note: '',
    link: '',
  });
  const navigate = useNavigate();
  const query = useQuery();
  const bookId = query.get('id');

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      try {
        const res = await axios.get('/books', { params: { _id: bookId } });
        const book = res.data.find((b) => b._id === bookId);
        if (book)
          setFormData({
            title: book.title || '',
            author: book.author || '',
            genre: book.genre || '',
            rating: book.rating || '',
            note: book.note || '',
            link: book.link || '',
          });
      } catch (err) {
        alert('Failed to load book data.');
      }
    };
    fetchBook();
  }, [bookId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bookId) {
        await axios.put(`/books/${bookId}`, formData);
      } else {
        await axios.post('/books', formData);
      }
      navigate('/dashboard');
    } catch {
      alert('Failed to save book.');
    }
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: "48px auto",
      background: "var(--card-bg)",
      padding: "44px 40px",
      borderRadius: "18px",
      boxShadow: "0 10px 40px rgb(50 70 110 / .20)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h2 style={{
        fontSize: "2.6rem",
        fontWeight: 700,
        textAlign: "center",
        marginBottom: 30,
        letterSpacing: ".4px"
      }}>{bookId ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "540px", display: "flex", flexDirection: "column", gap: "22px", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%" }}>
          <label style={{ fontWeight: 600, marginBottom: 5 }}>Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            style={{
              width: "100%",
              background: "var(--input-bg)",
              color: "var(--text-color)",
              padding: "16px",
              fontSize: "1.13rem",
              border: "1px solid var(--input-border)",
              borderRadius: "10px",
              marginBottom: "4px"
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={onChange}
            style={{
              width: "100%",
              background: "var(--input-bg)",
              color: "var(--text-color)",
              padding: "16px",
              fontSize: "1.13rem",
              border: "1px solid var(--input-border)",
              borderRadius: "10px",
              marginBottom: "4px"
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={onChange}
            style={{
              width: "100%",
              background: "var(--input-bg)",
              color: "var(--text-color)",
              padding: "16px",
              fontSize: "1.13rem",
              border: "1px solid var(--input-border)",
              borderRadius: "10px",
              marginBottom: "4px"
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <label>Rating (1 to 5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={onChange}
            style={{
              width: "100%",
              background: "var(--input-bg)",
              color: "var(--text-color)",
              padding: "16px",
              fontSize: "1.13rem",
              border: "1px solid var(--input-border)",
              borderRadius: "10px",
              marginBottom: "4px"
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <label>Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={onChange}
            rows="3"
            style={{
              width: "100%",
              background: "var(--input-bg)",
              color: "var(--text-color)",
              padding: "16px",
              fontSize: "1.13rem",
              border: "1px solid var(--input-border)",
              borderRadius: "10px",
              marginBottom: "4px",
              resize: "none"
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <label>Link</label>
          <input
            name="link"
            type="url"
            value={formData.link}
            onChange={onChange}
            placeholder="https://example.com/book"
            style={{
              width: "100%",
              background: "var(--input-bg)",
              color: "var(--text-color)",
              padding: "16px",
              fontSize: "1.13rem",
              border: "1px solid var(--input-border)",
              borderRadius: "10px",
              marginBottom: "4px"
            }}
          />
        </div>
        <button type="submit"
          style={{
            width: "100%",
            padding: "15px 0",
            fontSize: "1.18rem",
            fontWeight: 700,
            color: "white",
            background: "var(--primary-color)",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgb(74 144 226 / .24)",
            marginTop: "14px",
            cursor: "pointer"
          }}>
          {bookId ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
