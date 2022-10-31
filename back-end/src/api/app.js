const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRouter');

// const { loginRoute } = require('../routes');

const app = express();
app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/products', productRoutes);
app.get('/login', (_req, res) => res.status(200).json({ message: 'Login attempt' }));
app.post('/login', (_req, res) => res.status(404).json({ message: 'User not found' }));
app.use(express.static('public'));

module.exports = app;
