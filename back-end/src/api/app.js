const express = require('express');
const cors = require('cors');
// const { loginRoute } = require('../routes');
const { salesRoute, userRoute, productRoute } = require('../routes');
const Middleware = require('../middleware');

// const productRoutes = require('./routes/productRouter');

const app = express();
app.use(express.json());

app.use(cors());
app.use(salesRoute);
app.use('/login', userRoute);
app.use('/products', productRoute);

app.use(express.static('public'));

app.use(Middleware.error);

module.exports = app;
