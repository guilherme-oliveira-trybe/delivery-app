const express = require('express');
const { saleController } = require('../controllers');

const route = express.Router();

route.get('/customer/orders/:userId', saleController.getAllByUserId);

module.exports = route;