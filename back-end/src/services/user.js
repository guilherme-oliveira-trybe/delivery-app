const md5 = require('md5');
const { User } = require('../database/models');
const createToken = require('../middleware/createToken');

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

  login: async (email, passwordParams) => {
    const { dataValues: user } = await User.findOne({ where: { email } });
    if (!user) return null;

    const providedPassword = md5Decrypter(passwordParams);
    if (providedPassword !== user.password) return null;
    const { password, ...userFilter } = user;
    const token = createToken(user);
    return { ...userFilter, token };
  },

  create: async () => null,

  findByEmail: async (email) => {
    const user = await User.findOne({ where: { email } });

    return user;
  },
};

module.exports = UserService;
