const express = require('express');

const salesProduct = require('../controllers/salesProduct.controller');
// const Middleware = require('../middleware');

const router = express.Router();

// router.use(Middleware.auth);
router.post('/', salesProduct.create);
router.get('/', salesProduct.getAll);

module.exports = router;