const { productsService } = require('../services');


const productsController = {
  getAllProducts: async (_req, res) => {
    const products = await productsService.getAllProductsService();
  
    return res.status(200).json({ products });
  },
};

module.exports = productsController;