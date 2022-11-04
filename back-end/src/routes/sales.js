const express = require('express');
const { saleController } = require('../controllers');
const { validateToken } = require('../middleware/auth');
// const Middleware = require('../middleware'); 

const route = express.Router();

route.get('/customer/orders', validateToken, saleController.getAll);
route.get('/customer/orders/:id', saleController.getById);
// route.use(Middleware.validateSale.validateUsers);
// route.use(Middleware.validateSale.validateAddress);
// route.use(Middleware.validateSale.validateOrder);
route.post('/customer/orders/', saleController.create);
route.patch('/customer/orders/:id', saleController.updateStatus);

route.get('/seller/orders', validateToken, saleController.getAll);

module.exports = route;