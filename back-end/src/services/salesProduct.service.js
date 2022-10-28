const {
  Sales,
  SalesProducts,
  sequelize,
} = require('../database/models');

// {
//   id: 1,
//   userId: 1,
//   sellerId: 1,
//   totalPrice: 30,
//   deliveryAddress: '',
//   deliveryNumber: 123,
//   saleDate: new Date,
//   status: ''
// }

// {
//   saleId: 1,
//   productId: 1,
//   quantity: 2,
// }

// const ae = [
//   {
//     "saleId": 1,
//     "productId": 1,
//     "quantity": 2,
//   },
//   {
//     "saleId": 1,
//     "productId": 1,
//     "quantity": 2,
//   },
// ];

module.exports = {
  create: async (sale, order) => {
    console.log(sale);
    // validations

    const { data, code, message } = await sequelize.transaction(async (transaction) => {
      const newSale = { ...sale, status: 'Pendente' };

      const { dataValues } = await Sales.create(newSale, { transaction });
      
      const salesProductsArray = order.map(({ productId, quantity }) => ({
        saleId: dataValues.id, productId, quantity,
      }));
      
      await SalesProducts.bulkCreate(salesProductsArray, { transaction });
      
      return { code: 200, data: dataValues };
    });

    return { data, code, message };
  },

  getAll: async () => {
    const data = await Sales.findAll();
    console.log(data, '<---------------');
    return data;
  },
};