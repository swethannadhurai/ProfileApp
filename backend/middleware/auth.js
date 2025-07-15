const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redisclient');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: no token' });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const userId = await redisClient.get(`token:${token}`);
    if (!userId) {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("🔐 Auth error:", err.message);
    res.status(401).json({ message: 'Authentication failed. Please log in again.' });
  }
};

module.exports = auth;
