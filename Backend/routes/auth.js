const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');// for password hashing
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Q. what is password hashing? why bcrypt is used?
/*
Password hashing is the process of converting a plain-text password into a fixed-size string of characters,
known as a hash. The goal of password hashing is to make it difficult for attackers to guess the original password
by storing only the hashed version in the database. Bcrypt is a popular hashing algorithm specifically designed 
for securely hashing passwords.
It incorporates a salt (random data) into the hashing process to protect against rainbow table attacks and
is computationally intensive, making brute-force attacks more difficult.
Bcrypt is widely used in web applications for securely storing user passwords. bcrypt is a library that provides
functions to hash passwords and compare hashed passwords for authentication. it uses different encryption algorithms
to securely hash passwords before storing them in the database. In db the hashed passwords are stored rather
than plain-text passwords, enhancing security.
*/



// JWT secret for signing tokens (in real apps store in env vars)
const JWT_SECRET = 'No_secret_key';

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });// findOne checks if a user with the given email already exists
    // it is a mongoose method that queries the database for a single document matching the specified criteria
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);// generates a salt for hashing the password
    // Q. what is salt here? why we need to use salt?
    /*
    A salt is random data that is used as an additional input to a one-way hashing function.
    It is added to the input data to make it more difficult for attackers to guess the original password.
    basically, salt is key for encrypting passwords securely.
    by adding a unique salt to each password before hashing, even if two users have the same password,
    their hashed passwords will be different. this protects against rainbow table attacks
    */
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate JWT token
    // jwt token concist of three parts: header, payload, and signature
    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    // header will be added later when a request is made from the frontend
    // to the middleware for authentication
    // jwt_secret is used to sign the token and verify its authenticity later

    res.json({ token });// send the token back to the client as a response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // here, the req is a json object containing email and password sent from the client
  // the request will come from the frontend login form (axios post request) when user tries to login
  // event : the user clicks the login button on the login form then the request is sent to the backend
  // '/login' endpoint defined in auth.js will handle that request and send back a response which 
  // contains the jwt token if login is successful and valid credentials are provided. this entire process
  // is called authentication.

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare password hashes
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Login success, send token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });// what response is sent back to the client here?
    // the response sent back to the client is a JSON object containing the JWT token
    // is it the same token generated during signup? yes, it is generated in the same way using
    // the user id and the JWT secret. this token can be used by the client to authenticate
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route   GET /api/auth/user
// @desc    Get logged-in user profile info
// @access  Private (token required)

const auth = require('../middleware/authMiddleware');

router.get('/user', auth, async (req, res) => {
  try {
    // req.user contains userId set in authMiddleware from token
    const user = await User.findById(req.user).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
