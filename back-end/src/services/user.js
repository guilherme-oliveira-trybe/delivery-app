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
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    const { dataValues } = user;
    const providedPassword = md5Decrypter(passwordParams);
    if (providedPassword !== dataValues.password) return null;
    const { password, ...userFilter } = dataValues;
    const token = createToken(dataValues);
    return { ...userFilter, token };
  },

  findByEmail: async (email) => {
    const user = await User.findOne({ where: { email } });

    return user;
  },
  create: async (user) => {
    const userFound = await User.findOne({ where: { email: user.email } });
    if (!userFound) {
      const encryptedPassword = md5Decrypter(user.password);
      const newUser = await User.create({ ...user, password: encryptedPassword });
      return newUser;
    }
    return null;
  },

  delete: async (id) => {
    const user = await User.findAll({ where: { id } });
    if (user) {
      await User.destroy({ where: { id } });
      return user;
    }
    return null;
  },

};

module.exports = UserService;
