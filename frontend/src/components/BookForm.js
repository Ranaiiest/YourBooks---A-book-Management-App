import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/api';

// this useQuery hook helps to parse query parameters from the URL
// here, it is used to get the book ID when editing an existing book
const useQuery = () => new URLSearchParams(useLocation().search);
// useLocation is a hook from react-router-dom that returns the current location object
// the location object represents where the app is currently
// it contains information about the URL, including the pathname, search parameters, and hash
// here, we use useLocation to access the search part of the URL
// which contains the query parameters (like ?id=123)
// then, we create a new URLSearchParams object with that search string
// this allows us to easily retrieve the value of specific query parameters using the get method  

// Overview:
//-----------
// BookForm component allows adding a new book or editing an existing one
// it manages form state and handles form submission
// depending on whether a book ID is present in the URL query parameters
// it either creates a new book or updates an existing one

// the data fields managed by the form include title, author, genre, rating, note, and link
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
  const query = useQuery(); // custom hook to parse query parameters
  const bookId = query.get('id');


// Q. why use useEffect here? what it doing here?
/*
the useEffect hook is used here to fetch the existing book data from the server
when the component mounts, but only if a bookId is present in the URL query parameters.
here, component mounting refers to the initial rendering of the BookForm component 
in the React application.
if a bookId is found, it indicates that the user intends to edit an existing book rather 
than add a new one.
the useEffect hook runs the fetchBook function, which makes an API call to retrieve the
book data based on the bookId.
once the data is fetched successfully, it populates the form fields with the existing book
details by updating the formData state.
this allows the user to see the current values of the book they are editing and make changes 
as needed.
but if no bookId is present, the useEffect hook does nothing, and the form remains empty,
ready for the user to input details for a new book.
*/

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

// Q. what is onChange doing here?
/*
the onChange function is an event handler that updates the formData state
when the user types into any of the form input fields.
it extracts the name and value of the input field that triggered the event
and uses them to update the corresponding property in the formData state object.
this ensures that the component's state always reflects the current values entered
by the user in the form fields.
*/
const onChange = (e) => {
  const { name, value } = e.target; // here the name corresponds to the form field name
  // and value is the current value of that field
  setFormData((prev) => ({ ...prev, [name]: value }));
  // we can write it like this also
  // setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Q. what is onSubmit doing here?
/*
the onSubmit function is an event handler that manages the form submission process. 
it prevents the default form submission behavior, then checks if a bookId is present.
if a bookId exists, it sends a PUT request to update the existing book with the current
formData; if not, it sends a POST request to create a new book.
upon successful submission, it navigates the user back to the dashboard.
if an error occurs during the API call, it alerts the user that the save operation failed.
*/

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
