const { productsService } = require('../services');

const productsController = {
  getAllProducts: async (_req, res) => {
    const products = await productsService.getAllProductsService();
    return res.status(200).json({ products });
  },

  getProductById: async (req, res, next) => {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product || product.length === 0) {
      return next({ code: 404, message: 'Can\'t find product' });
    }
    return res.status(200).json({ product });
  },
};

module.exports = productsController;