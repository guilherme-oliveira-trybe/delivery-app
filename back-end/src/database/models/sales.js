module.exports = (sequelize, DataTypes) => {

  const Sales = sequelize.define('Sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    sellerId: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
    },
    saleDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING(50),
    }
  }, {
    underscore: true,
    timestamps: false,
    tableName: 'sales',
  });


  Sales.associate = (models) => {
    Sales.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Sales.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller'
    });
  };

  return Sales;
};