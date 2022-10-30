const { Sales, SalesProducts, sequelize } = require('../database/models');

const saleService = {
  getAllByUserId: async (userId) => {
    const sale = await Sales.findAll({ where: { userId } });

    return sale;
  },

  create: async (sale, order) => {
    // console.log(sale);
    // validations

    const saleCreated = await sequelize.transaction(async (transaction) => {
      const newSale = { ...sale, status: 'Pendente', saleDate: new Date() };

      const { dataValues } = await Sales.create(newSale, { transaction });
      const salesProductsArray = order.map(({ productId, quantity }) => ({
        saleId: dataValues.id, productId, quantity,
      }));

      await SalesProducts.bulkCreate(salesProductsArray, { transaction });
      return dataValues;
    });
    return saleCreated;
  },
};

module.exports = saleService;