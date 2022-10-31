import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

const getAllProducts = async () => {
  const data = await api.get('/products')
    .then((response) => response.data);
  return data;
};

export default getAllProducts;
