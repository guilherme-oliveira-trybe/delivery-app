const express = require('express');
const cors = require('cors');
const { salesRoute } = require('../routes');
// const { loginRoute } = require('../routes');

const app = express();
app.use(express.json());

app.use(cors());
app.use(salesRoute);

app.get('/login', (_req, res) => res.status(200).json({ message: 'Login attempt' }));
app.post('/login', (_req, res) => res.status(404).json({ message: 'User not found' }));

module.exports = app;
