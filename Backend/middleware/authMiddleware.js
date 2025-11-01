const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

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
