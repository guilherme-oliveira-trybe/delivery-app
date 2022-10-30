const express = require('express');
const { saleController } = require('../controllers');

const route = express.Router();

route.get('/customer/orders/:userId', saleController.getAllByUserId);
route.post('/customer/orders/', saleController.create);

module.exports = route;