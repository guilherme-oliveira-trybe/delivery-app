module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      total_price: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
      },
      delivery_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      delivery_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
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