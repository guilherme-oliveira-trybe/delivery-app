const allSalesMock = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: 29.10,
    deliveryAddress: 'Av. Brasilia',
    deliveryNumber: '669',
    saleDate: '2022-11-09 17:52:17',
    status: 'Pendente'
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: 39.03,
    deliveryAddress: 'Rua Antônio Gabrich',
    deliveryNumber: '130',
    saleDate: '2022-11-09 17:52:52',
    status: 'Pendente'
  },
  {
    id: 3,
    userId: 3,
    sellerId: 2,
    totalPrice: 29.94,
    deliveryAddress: 'Rua Pirajá',
    deliveryNumber: '1040',
    saleDate: '2022-11-09 17:53:14',
    status: 'Pendente'
  },
]

const salesCreatedMock = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 29.10,
  deliveryAddress: 'Av. Brasilia',
  deliveryNumber: '669',
  saleDate: '2022-11-09 17:52:17',
  status: 'Pendente'
}

const salesBodyMock = {
  userId: 3,
  sellerId: 2,
  totalPrice: 29.10,
  deliveryAddress: 'Av. Brasilia',
  deliveryNumber: '669',
  orders: [{
    productId: 1,
    quantity: 4,
  }]
}

const customer = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer'
}

const seller = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: '3c28d2b0881bf46457a853e0b07531c6',
  role: 'seller'
}

const salesById = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: "76.69",
  deliveryAddress: "Pereira Rodovia",
  deliveryNumber: "685",
  saleDate: "2022-11-09T19:47:29.000Z",
  status: "Pendente",
  seller: {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller"
  },
  products: [
    {
      id: 2,
      name: "Heineken 600ml",
      price: "7.50",
      urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
      SalesProduct: {
        quantity: 4
      }
    },
    {
      id: 4,
      name: "Brahma 600ml",
      price: "7.50",
      urlImage: "http://localhost:3001/images/brahma_600ml.jpg",
      SalesProduct: {
        quantity: 1
      }
    },
    {
      id: 5,
      name: "Skol 269ml",
      price: "2.19",
      urlImage: "http://localhost:3001/images/skol_269ml.jpg",
      SalesProduct: {
        quantity: 4
      }
    },
    {
      id: 6,
      name: "Skol Beats Senses 313ml",
      price: "4.49",
      urlImage: "http://localhost:3001/images/skol_beats_senses_313ml.jpg",
      SalesProduct: {
        quantity: 3
      }
    },
    {
      id: 7,
      name: "Becks 330ml",
      price: "4.99",
      urlImage: "http://localhost:3001/images/becks_330ml.jpg",
      SalesProduct: {
        quantity: 2
      }
    },
    {
      id: 11,
      name: "Stella Artois 275ml",
      price: "3.49",
      urlImage: "http://localhost:3001/images/stella_artois_275ml.jpg",
      SalesProduct: {
        quantity: 2
      }
    }
  ]
}

const salesUpdate = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: "76.69",
  deliveryAddress: "Pereira Rodovia",
  deliveryNumber: "685",
  saleDate: "2022-11-09T19:47:29.000Z",
  status: "Entregue",
  seller: {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller"
  },
  products: [
    {
      id: 2,
      name: "Heineken 600ml",
      price: "7.50",
      urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
      SalesProduct: {
        quantity: 4
      }
    },
    {
      id: 4,
      name: "Brahma 600ml",
      price: "7.50",
      urlImage: "http://localhost:3001/images/brahma_600ml.jpg",
      SalesProduct: {
        quantity: 1
      }
    },
    {
      id: 5,
      name: "Skol 269ml",
      price: "2.19",
      urlImage: "http://localhost:3001/images/skol_269ml.jpg",
      SalesProduct: {
        quantity: 4
      }
    },
    {
      id: 6,
      name: "Skol Beats Senses 313ml",
      price: "4.49",
      urlImage: "http://localhost:3001/images/skol_beats_senses_313ml.jpg",
      SalesProduct: {
        quantity: 3
      }
    },
    {
      id: 7,
      name: "Becks 330ml",
      price: "4.99",
      urlImage: "http://localhost:3001/images/becks_330ml.jpg",
      SalesProduct: {
        quantity: 2
      }
    },
    {
      id: 11,
      name: "Stella Artois 275ml",
      price: "3.49",
      urlImage: "http://localhost:3001/images/stella_artois_275ml.jpg",
      SalesProduct: {
        quantity: 2
      }
    }
  ]
}

const saleStatusUpdate = {
  status: 'Entregue'
}

module.exports = { allSalesMock, salesCreatedMock, salesBodyMock, customer, seller, salesById, salesUpdate, saleStatusUpdate }