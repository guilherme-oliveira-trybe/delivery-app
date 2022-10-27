module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('salesProducts', {
      sale_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'sales',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'products',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  
  down: async (QueryInterface, _Sequelize) => {
    await QueryInterface.dropTable('salesProducts');
  },
}; 