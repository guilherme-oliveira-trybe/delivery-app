const { userService } = require('../services');

const saleController = {
  getAll: async (_req, res) => {
    const users = await userService.findAll();

    return res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { userId } = req.params;
    const user = await userService.findAll({ where: { userId } });

    return res.status(200).json(user);
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.login(email, password);

    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  },

  create: async () => {
    const { name, email, password } = req.body;
    await userService.create(name, email, password);

    return res.status(201).json({ message: "Created" });
  },
};

module.exports = saleController;