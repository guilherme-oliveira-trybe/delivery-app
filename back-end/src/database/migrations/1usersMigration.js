module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(255),
        allowNull: false,
      }
    });
  },
  
  down: async (QueryInterface, _Sequelize) => {
    await QueryInterface.dropTable('users');
  },
}; 