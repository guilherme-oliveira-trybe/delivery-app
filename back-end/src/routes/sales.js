const express = require('express');
const { saleController } = require('../controllers');
// const Middleware = require('../middleware'); 

const route = express.Router();

route.get('/customer/orders/:userId', saleController.getAllByUserId);
// route.use(Middleware.validateSale.validateUsers);
// route.use(Middleware.validateSale.validateAddress);
// route.use(Middleware.validateSale.validateOrder);
route.post('/customer/orders/', saleController.create);

module.exports = route;