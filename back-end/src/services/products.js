const { Product } = require('../database/models');

const productsService = {
  getAllProductsService: async () => {
    const products = await Product.findAll();
    return products;
  },
};

module.exports = productsService;
