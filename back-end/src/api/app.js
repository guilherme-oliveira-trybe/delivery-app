const express = require('express');
const cors = require('cors');
const { salesRoute } = require('../routes');
const Middleware = require('../middleware');

const app = express();
app.use(express.json());

app.use(cors());
app.use(salesRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

// Middleware de Erro Genérico
app.use(Middleware.error);

module.exports = app;
