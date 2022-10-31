const express = require('express');
const cors = require('cors');
const { salesRoute, userRoute, productRoute } = require('../routes');
const Middleware = require('../middleware');

// const productRoutes = require('./routes/productRouter');



const app = express();
app.use(express.json());

app.use(cors());
app.use(salesRoute);
app.use(userRoute);


app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/products', productRoute);

app.get('/login', (_req, res) => res.status(200).json({ message: 'Login attempt' }));
app.post('/login', (_req, res) => res.status(404).json({ message: 'User not found' }));
app.use(express.static('public'));


app.use(Middleware.error);


module.exports = app;
