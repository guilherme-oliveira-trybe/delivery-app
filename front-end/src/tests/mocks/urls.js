import validUser from './validUser';
import allProducts from './products.mock';
import sales from './sales.mock';
import {
  allUsers,
  allUsersSellers,
  userAdmin,
  userSeller,
  userCustomer,
} from './users.mock';

const URLS = {
  'http://localhost:3001/user': allUsers,
  'http://localhost:3001/user/role/seller': allUsersSellers,
  'http://localhost:3001/user/1': userAdmin,
  'http://localhost:3001/user/2': userSeller,
  'http://localhost:3001/user/3': userCustomer,
  'http://localhost:3001/products': allProducts,
  'http://localhost:3001/products/1': { product: [allProducts[0]] },
  'http://localhost:3001/products/2': { product: [allProducts[1]] },
  'http://localhost:3001/products/3': { product: [allProducts[2]] },
  'http://localhost:3001/products/4': { product: [allProducts[3]] },
  'http://localhost:3001/products/5': { product: [allProducts[4]] },
  'http://localhost:3001/products/6': { product: [allProducts[5]] },
  'http://localhost:3001/products/7': { product: [allProducts[6]] },
  'http://localhost:3001/products/8': { product: [allProducts[7]] },
  'http://localhost:3001/products/9': { product: [allProducts[8]] },
  'http://localhost:3001/products/10': { product: [allProducts[9]] },
  'http://localhost:3001/products/11': { product: [allProducts[10]] },
  'url sales aqui': sales,
  'http://localhost:3000/login': validUser,
};

export default URLS;
