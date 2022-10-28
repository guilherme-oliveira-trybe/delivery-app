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
    underscore: true,
    timestamps: false,
    tableName: 'salesProducts',
  });

  SalesProduct.associate = (models) => {
    models.Sales.belongsToMany(models.Product, {
      through: SalesProduct,
      as: 'sales',
      foreignKey: 'saleId',
      otherKey: 'productId'
    });

    models.Product.belongsToMany(models.Sales, {
      through: SalesProduct,
      as: 'product',
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
  };

  return SalesProduct;
};