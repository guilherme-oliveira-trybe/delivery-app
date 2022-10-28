const rescue = require('express-rescue');
const salesProduct = require('../services/salesProduct.service');

module.exports = {
  create: rescue(async (req, res, next) => {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, order } = req.body;
    // const { userId } = req.user;
    console.log(req.body);
    const { data, code, message } = await salesProduct.create({
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
    }, order);
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }),

  getAll: rescue(async (_req, res, next) => {
    const { data, code } = await salesProduct.getAll();
    // if (message) return next({ code, message });
    return res.status(code).json(data);
  }),
};
