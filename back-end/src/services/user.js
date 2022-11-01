const { User } = require('../database/models');

const md5 = require('md5');

const md5Decrypter = (password) => {
  const passwordDecrypted = md5(password);
  return passwordDecrypted;
}

const UserService = {
  getAll: async () => {
    const users = await Users.findAll();

    return users;
  },

  getById: async (userId) => {
    const user = await Users.findAll({ where: { userId } });

    return user;
  },

  login: async (email, password) => {
    const user = await User.findOne({ where: { email } });

    const providedPassowrd = md5Decrypter(password);
    if (providedPassowrd !== user.password) return null;
    
    return user;
  },

  create: async () => null,
};

module.exports = UserService;
