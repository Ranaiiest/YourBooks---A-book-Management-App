const express = require('express');
const cors = require('cors');
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
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

// Root route
app.get('/', (req, res) => {
  res.send('YourBooks backend is running ✅');
});

// Server start (comment out if deploying on Vercel backend)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export app for Vercel if needed
module.exports = app;
