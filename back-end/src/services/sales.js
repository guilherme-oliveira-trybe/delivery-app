const { Sales } = require('../database/models');

const saleService = {
  getAllByUserId: async (userId) => {
    const sale = await Sales.findAll({ where: { userId } });

    return sale;
  },
};

module.exports = saleService;