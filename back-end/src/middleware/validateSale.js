const validateUsers = async (req, _res, next) => {
  const { userId, sellerId } = req.body;
  if (!userId) {
    next({ code: 404, message: 'Must have a valid User Buying' });
  }
  if (!sellerId) {
    next({ code: 404, message: 'Must have a valid User Buying' });
  }
};

const validateAddress = async (req, _res, next) => {
  const { deliveryAddress, deliveryNumber } = req.body;
  if (!deliveryAddress || typeof deliveryAddress !== 'string') {
    next({ code: 404, message: 'Must have a valid Address info' });
  }
  if (!deliveryNumber || typeof deliveryNumber !== 'number') {
    next({ code: 404, message: 'Must have a valid Address number' });
  }
};

const validateOrder = async (req, _res, next) => {
  const { orders } = req.body;
  if (!orders) {
    next({ code: 404, message: 'Must have a array of products' });
  }
  const validArray = orders.map((order) => {
    const user = 'TO DO';
    if (user !== null && typeof order.quantity !== 'number') {
      return false;
    }
    return true;
  });
  if (!validArray.every((item) => item === true)) {
    next({ code: 404, message: 'Must have a array of valid products and quantity' });
  }
};

module.exports = {
  validateUsers,
  validateAddress,
  validateOrder,
};
