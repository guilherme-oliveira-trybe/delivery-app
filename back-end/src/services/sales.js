const { Sales, SalesProduct, sequelize } = require('../database/models');

const saleService = {
  getAllByUserId: async (userId) => {
    const sale = await Sales.findAll({ where: { userId } });

    return sale;
  },

  create: async (sale, orders) => {
    try {
      const saleCreated = await sequelize.transaction(async (transaction) => {
        const newSale = { ...sale, status: 'Pendente', saleDate: new Date() };
        const { dataValues } = await Sales.create(newSale, { transaction });
        const salesProductsArray = orders.map(({ productId, quantity }) => ({
          saleId: dataValues.id, productId, quantity,
        }));
        await SalesProduct.bulkCreate(salesProductsArray, { transaction });
        return dataValues;
      });
      return saleCreated;
    } catch (error) {
      return null;
    }
  },
};

module.exports = saleService;
