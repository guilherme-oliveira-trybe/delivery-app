const { Router } = require('express');

const { getAllProducts } = require('../controllers/productsController');

const route = Router();

route.get('/', getAllProducts);

module.exports = route;
