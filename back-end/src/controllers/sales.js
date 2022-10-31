const { saleService } = require('../services');

const saleController = {
  getAllByUserId: async (req, res) => {
    const { userId } = req.params;
    const result = await saleService.getAllByUserId(userId);

    return res.status(200).json(result);
  },

  create: async (req, res, next) => {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, order } = req.body;
    // const { userId } = req.user;
    // console.log(req.body);
    const saleCreated = await saleService.create({
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
    }, order);
    console.log(saleCreated);
    if (saleCreated === null) return next({ code: 404, message: 'Can\'t create sale' });
    return res.status(201).json(saleCreated);
  },
};

module.exports = saleController;