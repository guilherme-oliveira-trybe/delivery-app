const jwt = require('jsonwebtoken');

const jwtKey = require('fs').readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const validateToken = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const data = jwt.verify(token, jwtKey);
    req.user = data;

    next();
  } catch (error) {
    next({ code: 401, message: 'Token must be a valid token' });
  }
};

module.exports = {
  validateToken,
};
