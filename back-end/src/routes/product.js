const { Router } = require('express');

const { productsController } = require('../controllers');
const { validateToken } = require('../middleware/auth');

const route = Router();

route.get('/', validateToken, productsController.getAllProducts);

module.exports = route;
