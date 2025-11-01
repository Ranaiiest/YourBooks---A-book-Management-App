const express = require('express');
const cors = require('cors');

// Import database connection function
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // frontend URL
  credentials: true,                // enable set-cookie header
};

app.use(cors(corsOptions));
app.use(express.json());

// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
