const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRouter');

const app = express();
app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/products', productRoutes);

module.exports = app;
