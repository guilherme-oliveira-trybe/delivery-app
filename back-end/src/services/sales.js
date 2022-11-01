const { Sales, SalesProduct, sequelize } = require('../database/models');

const saleService = {
  getAllByUserId: async (userId) => {
    const sale = await Sales.findAll({ where: { userId } });

    return sale;
  },

  // Inicialização de uma nova data no fuso horário de 'Zulu' (UTC+0) provieniente do StackOverflow
  // source: https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone
  create: async (sale, orders) => {
    try {
      const saleCreated = await sequelize.transaction(async (transaction) => {
        const d = new Date();
        const newSale = {
          ...sale,
          status: 'Pendente',
          saleDate: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds())),
        };
        const { dataValues } = await Sales.create(newSale, { transaction });
        const salesProductsArray = orders.map(({ productId, quantity }) => ({
          saleId: dataValues.id, productId, quantity,
        }));
        await SalesProduct.bulkCreate(salesProductsArray, { transaction });
        return dataValues;
      });
      return saleCreated;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
};

module.exports = saleService;
