
const loginMock = {
  email: 'adm@deliveryapp.com',
  password: '--adm2@21!!--'
}

const loginWrongPasswordMock = {
  email: 'adm@deliveryapp.com',
  password: 'passwordErrado'
}

const userMock = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator'
}

const userRegisterBodyMock = {
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: '--adm2@21!!--'
}

const admRegisterBodyMock = {
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: 'fulana@123',
  role: 'seller'
}

const userRegisterByAdmMock = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: '3c28d2b0881bf46457a853e0b07531c6',
  role: 'seller'
}

const allUsersMock = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator'
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller'
  }
]

module.exports = { loginMock, userMock, userRegisterBodyMock, admRegisterBodyMock, userRegisterByAdmMock, allUsersMock, loginWrongPasswordMock }

