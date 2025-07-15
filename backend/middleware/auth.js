const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redisclient');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized: no token' });

    const userId = await redisClient.get(`token:${token}`);
    if (!userId) return res.status(401).json({ message: 'Session expired or invalid token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;