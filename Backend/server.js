const express = require('express');
const cors = require('cors'); // import cors js package to handle CORS issues
require('dotenv').config();

const connectDB = require('./config/db');
const app = express();

// Connect to DB
connectDB();

// Log the environment variables (for debugging)
console.log('Frontend URL from ENV:', process.env.FRONTEND_URL);


const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

console.log('CORS Origin:', corsOptions.origin);

// Middleware
app.use(cors(corsOptions));// enable CORS with the specified options
app.use(express.json());// parse incoming JSON requests, making the data available in req.body
// so we don't have to use body-parser package separately



// Routes
app.use('/api/auth', require('./routes/auth'));// authentication routes
app.use('/api/books', require('./routes/books'));// book management routes

// Root route
app.get('/', (req, res) => {
  res.send('YourBooks backend is running ✅');
});

// Server start (comment out if deploying on Vercel backend)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// the server listens on the specified PORT (from environment variable or default 5000)

// Export app for Vercel if needed
module.exports = app;




