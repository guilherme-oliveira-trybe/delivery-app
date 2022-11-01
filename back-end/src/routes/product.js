const { Router } = require('express');

const { productsController } = require('../controllers');

const route = Router();

route.get('/:id', productsController.getProductById);
route.get('/', productsController.getAllProducts);

module.exports = route;
