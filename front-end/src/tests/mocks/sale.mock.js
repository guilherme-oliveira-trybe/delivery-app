export const saleCreated = {
  id: 1,
  userId: 3,
  sellerId: '2',
  totalPrice: '16.59',
  deliveryAddress: 'Rua Teste',
  deliveryNumber: '123',
  status: 'Pendente',
  saleDate: '2022-11-15T20:56:50.173Z',
};

export const saleWithAllInfo = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '16.59',
    deliveryAddress: 'Rua Teste',
    deliveryNumber: '123',
    saleDate: '2022-11-15T20:56:50.000Z',
    status: 'Em Trânsito',
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
          quantity: 3,
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
      {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
        SalesProduct: {
          quantity: 1,
        },
      },
    ],
  },
];

export const saleWithAllInfoDelivery = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '16.59',
    deliveryAddress: 'Rua Teste',
    deliveryNumber: '123',
    saleDate: '2022-11-15T20:56:50.000Z',
    status: 'Entregue',
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
          quantity: 3,
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
      {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
        SalesProduct: {
          quantity: 1,
        },
      },
    ],
  },
];
