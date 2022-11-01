import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const loginAttempt = async (body) => {
  const data = await api.post('/login', body)
    .then((response) => response.data);
  return data;
};

export const registerAttempt = async (body) => {
  const data = await api.post('/register', body)
    .then((response) => response.data);
  return data;
};

const getAllProducts = async () => {
  const data = await api.get('/products')
    .then((response) => response.data);
  return data;
};

export default getAllProducts;
