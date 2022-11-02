const { Sales, SalesProduct, sequelize, User, Product } = require('../database/models');

// Inicialização de uma nova data no fuso horário de 'Zulu' (UTC+0) provieniente do StackOverflow
// source: https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone
const utcDate = () => {
  const d = new Date();
  const date = new Date(Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
    d.getUTCMilliseconds(),
    ));
  return date;
};

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

    return [sale];
  },

  create: async (sale, orders) => {
    try {
      const saleCreated = await sequelize.transaction(async (transaction) => {
        const newSale = {
          ...sale,
          status: 'Pendente',
          saleDate: utcDate(),
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
      return null;
    }
  },

  updateStatus: async (id, status) => {
    const sale = await Sales.findAll({ where: { id } });
    if (!sale || sale.length === 0) return null;
    await Sales.update({ status }, { where: { id } });
    const saleUpdate = await Sales.findAll({ where: { id } });
    return saleUpdate;
  },
};

module.exports = saleService;
