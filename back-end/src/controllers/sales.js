const { saleService } = require('../services');

const saleController = {
  getAllByUserId: async (req, res) => {
    const { userId } = req.params;
    const result = await saleService.getAllByUserId(userId);

    return res.status(200).json(result);
  },
};

module.exports = saleController;