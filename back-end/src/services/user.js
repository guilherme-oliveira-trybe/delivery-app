const md5 = require('md5');
const { User } = require('../database/models');

const md5Decrypter = (password) => {
  const passwordDecrypted = md5(password);
  return passwordDecrypted;
};

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

  login: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const providedPassword = md5Decrypter(password);
    if (providedPassword !== user.password) return null;

    return user;
  },

  create: async (name, email, password) => {
    const user = await User.create({ name, email, password });
    return user;
  },
};

module.exports = UserService;
