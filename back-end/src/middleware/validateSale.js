const { userService, productsService } = require('../services');

const validateUsers = async (req, _res, next) => {
  const { userId, sellerId } = req.body;
  const isValidUser = await userService.getById(userId);
  if (!isValidUser || isValidUser.length === 0) {
    next({ code: 404, message: 'Must have a valid User' });
  }
  const isValidSeller = await userService.getById(sellerId);
  if (!isValidSeller || isValidSeller.length === 0) {
    next({ code: 404, message: 'Must have a valid Seller' });
  }
  next();
};

const validateAddress = async (req, _res, next) => {
  const { deliveryAddress, deliveryNumber } = req.body;
  if (!deliveryAddress || typeof deliveryAddress !== 'string') {
    next({ code: 404, message: 'Must have a valid Address info' });
  }
  if (!deliveryNumber) {
    next({ code: 404, message: 'Must have a Address number' });
  }
  next();
};

const validateOrder = async (req, _res, next) => {
  const { orders } = req.body;
  if (!orders) {
    next({ code: 404, message: 'Must have a array of products' });
  }
  const productsArray = await Promise
    .all(orders.map(({ productId }) => productsService.getProductById(productId)));
  if (!productsArray.every((item) => item !== null)) {
    next({ code: 404, message: 'Must have a array of valid products' });
  }
  if (!orders.every(({ quantity }) => typeof quantity === 'number')) {
    next({ code: 404, message: 'Must have a array with valid quantity' });
  }
  next();
};

module.exports = {
  validateUsers,
  validateAddress,
  validateOrder,
};
