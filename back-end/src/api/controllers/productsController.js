const { getAllProductsService } = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const products = await getAllProductsService();

  return res.status(200).json({ products });
};

module.exports = {
  getAllProducts
};
