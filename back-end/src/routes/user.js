const express = require('express');
const { userController } = require('../controllers');
// const Middleware = require('../middleware'); 

const route = express.Router();

route.get('/algo/:id', userController.getById);
route.get('/algo', userController.getAll);
route.post('/algo', userController.create);

route.post('/', userController.login);

module.exports = route;