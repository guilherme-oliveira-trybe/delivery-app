import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const loginAttempt = async (body) => {
  const data = await api.post('/login', body)
    .then((response) => response.data);
  return data;
};

const getAllProducts = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const data = await api.get('/products', { headers: { Authorization: `${user.token}` } })
    .then((response) => response.data);
  return data;
};

export default getAllProducts;
