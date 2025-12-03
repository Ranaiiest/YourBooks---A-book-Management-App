const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

// Q. what is the purpose of this middleware?
/*
It is a function that acts as middleware to authenticate requests using JSON Web Tokens (JWT).
This middleware function is used to protect routes by verifying the presence
and validity of a JSON Web Token (JWT) in the request headers.
It checks for the presence of the JWT in the 'x-auth-token' header or the
'Authorization' header (formatted as 'Bearer <token>').
If a valid token is found, it decodes the token to extract the user ID and
attaches it to the request object as 'req.user'.
The middleware then passes control to the next middleware or route handler. 
*/


module.exports = function(req, res, next) {
  // Support token from either x-auth-token header or Authorization: Bearer <token>
  let token = req.header('x-auth-token');

  if (!token) {
    const authHeader = req.header('authorization') || req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId; // Attach user id to request object
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
