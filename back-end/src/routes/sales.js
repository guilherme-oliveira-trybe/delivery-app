const express = require('express');
const { saleController } = require('../controllers');
const { validateToken } = require('../middleware/auth');

const route = express.Router();

route.get('/customer/orders', validateToken, saleController.getAll);
route.get('/customer/orders/:id', validateToken, saleController.getById);

route.patch('/customer/orders/:id', saleController.updateStatus);
route.post('/customer/orders', validateToken, saleController.create);

route.get('/seller/orders', validateToken, saleController.getAll);
route.get('/seller/orders/:id', validateToken, saleController.getById);

module.exports = route;