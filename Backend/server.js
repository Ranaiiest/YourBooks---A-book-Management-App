const express = require('express');
const cors = require('cors');
require('dotenv').config();  // <--- add this

const connectDB = require('./config/db');
const app = express();

connectDB();

const corsOptions = {
  origin: 'https://your-books-a-book-management-app.vercel.app/',
  // i want to print the value of origin to the console
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

console.log('CORS Origin:', corsOptions.origin);

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
