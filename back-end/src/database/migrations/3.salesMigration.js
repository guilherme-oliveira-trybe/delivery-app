module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'user_id'
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'seller_id'
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
        field: 'total_price'
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'delivery_number'
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'sale_date',
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },
  
  down: async (QueryInterface, _Sequelize) => {
    await QueryInterface.dropTable('sales');
  },
}; 