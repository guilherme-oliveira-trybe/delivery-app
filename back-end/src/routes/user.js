const express = require('express');
const { userController } = require('../controllers');
// const Middleware = require('../middleware'); 

const route = express.Router();

route.get('/user/role/:role', userController.getByRole);
route.get('/user/:id', userController.getById);
route.get('/user', userController.getAll);
route.post('/algo', userController.create);

route.post('/', userController.login);

module.exports = route;