const saleDate = '2022-11-14T02:23:35.000Z';

export const firstOrder = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '9.70',
  deliveryAddress: 'Rio um',
  deliveryNumber: '1',
  saleDate,
  status: 'Pendente',
};

export const secondOrder = {
  id: 2,
  userId: 3,
  sellerId: 2,
  totalPrice: '17.78',
  deliveryAddress: 'Rua Dois',
  deliveryNumber: '2',
  saleDate,
  status: 'Pendente',
};

export const thirdOrder = {
  id: 3,
  userId: 3,
  sellerId: 2,
  totalPrice: '17.85',
  deliveryAddress: 'Rua Três',
  deliveryNumber: '3',
  saleDate,
  status: 'Pendente',
};

export const ordersMock = [firstOrder, secondOrder, thirdOrder];

export const firstOrderDetails = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '9.70',
    deliveryAddress: 'Rio um',
    deliveryNumber: '1',
    saleDate,
    status: 'Pendente',
    seller: {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      role: 'seller',
    },
    products: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        SalesProduct: {
          quantity: 1,
        },
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
        SalesProduct: {
          quantity: 1,
        },
      },
    ],
  },
];

export const orderPreparingPatch = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '9.70',
    deliveryAddress: 'Rio um',
    deliveryNumber: '1',
    saleDate,
    status: 'Preparando',
  },
];

export const orderDispatchPatch = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '9.70',
    deliveryAddress: 'Rio um',
    deliveryNumber: '1',
    saleDate: '2022-11-14T02:23:35.000Z',
    status: 'Em Trânsito',
  },
];

export const orderDisplay = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '16.59',
    deliveryAddress: 'Rua Teste',
    deliveryNumber: '123',
    saleDate: '2022-11-15T20:56:50.000Z',
    status: 'Pendente',
  },
];
