const express = require('express');
const cors = require('cors');
const salesProduct = require('../routes/salesProduct.route');
const error = require('../middleware/error');

const app = express();
app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/salesproducts', salesProduct);

app.use(error);

module.exports = app;
