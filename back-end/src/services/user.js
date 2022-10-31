const { Users } = require('../database/models');

const UserService = {
  getAll: async () => {
    const users = await Users.findAll();

    return users;
  },

  getById: async (userId) => {
    const user = await Users.findAll({ where: { userId } });

    return user;
  },

  create: async () => null,

  findByEmail: async (email) => {
    const user = await Users.findOne({ where: { email } });

    return user;
  }
};

module.exports = UserService;
