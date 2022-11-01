const express = require('express');
const { saleController } = require('../controllers');
const Middleware = require('../middleware'); 

const route = express.Router();

route.get('/customer/orders', saleController.getAll);
route.get('/customer/orders/:id', saleController.getById);
route.patch('/customer/orders/:id', saleController.updateStatus);

route.post(
  '/customer/orders/',
  Middleware.validateSale.validateUsers,
  Middleware.validateSale.validateAddress,
  Middleware.validateSale.validateOrder,
  saleController.create,
);

module.exports = route;