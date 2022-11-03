require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const { userService } = require('../services');

// Middleware de autentificação proveniente da resolução do exercício
const validateToken = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const { email } = jwt.verify(token, JWT_SECRET);

    const { code, message } = await userService.findByEmail(email);
    if (message) return res.status(code).json({ message });
    // req.user = { displayName: data.displayName, userId: data.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateToken,
};
