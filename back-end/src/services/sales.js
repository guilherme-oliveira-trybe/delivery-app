const { Sales } = require('../database/models');

const saleService = {
  getOneByUserId: async (userId) => {
    const sale = await Sales.findAll({ where: { userId } });

    return sale;
  },
};

module.exports = saleService;