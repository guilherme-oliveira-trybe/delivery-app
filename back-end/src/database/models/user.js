module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.STRING(255),
      defaultValue: 'custumer',
    }
  }, {
    timestamps: false,
    tableName: 'users'
  });


  User.associate = (models) => {
    User.hasMany(models.Sales, {
      foreignKey: 'id',
    });
  };


  return User;
};