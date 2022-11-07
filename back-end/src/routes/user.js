const express = require('express');
const { userController } = require('../controllers');
const { validateToken } = require('../middleware/auth');
// const Middleware = require('../middleware'); 

const route = express.Router();

route.get('/user/role/:role', userController.getByRole);
route.get('/user/:id', userController.getById);
route.get('/user', userController.getAll);
route.delete('/user/:id', userController.delete);

route.post('/login', userController.login);
route.post('/register', userController.create);
route.post('/registerAdm', validateToken, userController.createUserByAdm);

module.exports = route;