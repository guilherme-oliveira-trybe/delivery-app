module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(4,2),
        allowNull: false,
      },
      urlImage: {
        type: Sequelize.STRING(200),
        allowNull: false,
        field: 'url_image'
      }
    });
  },
  
  down: async (QueryInterface, _Sequelize) => {
    await QueryInterface.dropTable('products');
  },
}; 