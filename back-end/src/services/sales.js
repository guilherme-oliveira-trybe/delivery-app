const { Sales, SalesProduct, sequelize, User, Product } = require('../database/models');

const saleService = {
  getAll: async () => {
    const sales = await Sales.findAll();

    return sales;
  },

  getById: async (id) => {
    const sale = await Sales.findByPk(id, {
      include: [{
        model: User,
        as: 'seller',
        attributes: { exclude: ['password'] },
      },
      {
        model: Product,
        as: 'products',
        through: {
          attributes: ['quantity'],
        },
      },
    ],
    });

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
