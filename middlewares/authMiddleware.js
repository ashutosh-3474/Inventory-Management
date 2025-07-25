const jwt = require('jsonwebtoken');


exports.authenticateToken = (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

