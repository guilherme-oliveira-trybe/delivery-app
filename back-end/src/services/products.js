const { Product } = require('../database/models');

const productsService = {
  getAllProductsService: async () => {
    const products = await Product.findAll();
    return products;
  },

  getProductById: async (id) => {
    const products = await Product.findAll({ where: { id } });
    return products;
  },
};

module.exports = productsService;
