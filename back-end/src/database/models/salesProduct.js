module.exports = (sequelize, DataTypes) => {

  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    }
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'sales_products'
  });

  SalesProduct.associate = (models) => {
    models.Sales.belongsToMany(models.Product, {
      through: SalesProduct,
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId'
    });

    models.Product.belongsToMany(models.Sales, {
      through: SalesProduct,
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
  };

  return SalesProduct;
};