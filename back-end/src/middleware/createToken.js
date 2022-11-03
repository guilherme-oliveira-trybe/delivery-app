require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'meu_segredo';

module.exports = (email) => {
  const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  return token;
};