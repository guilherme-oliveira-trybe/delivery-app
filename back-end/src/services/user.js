const { User } = require('../database/models');

const UserService = {
  getAll: async () => {
    const users = await User.findAll();
    return users;
  },

  getByRole: async (role) => {
    const users = await User.findAll({ where: { role } });
    return users;
  },

  getById: async (id) => {
    const user = await User.findAll({ where: { id } });
    return user;
  },

  create: async () => null,
};

module.exports = UserService;
