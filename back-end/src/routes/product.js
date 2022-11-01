const { Router } = require('express');

const { productsController } = require('../controllers');
// const { validateToken } = require('../middleware/auth');

const route = Router();

route.get('/', productsController.getAllProducts);

module.exports = route;
