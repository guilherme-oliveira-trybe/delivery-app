import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import OrderCard from '../components/customerOrders/OrderCard';

export default function Orders() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [idUser, setIdUser] = useState();
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const getUserInfo = () => {
      if (!localStorage.getItem('user')) {
        return history.push('/login');
      }
      const { id, token } = JSON.parse(localStorage.getItem('user'));
      setIdUser(id);
      setUserToken(token);
    };
    const fetchCustomerOrders = async (value) => {
      const url = 'http://www.localhost:3001/customer/orders';
      const header = { headers: { Authorization: `${userToken}` } };
      const { data } = await axios.get(url, header);
      const orderByUserId = data.filter((order) => order.userId === value);
      setCustomerOrder(orderByUserId);
    };
    getUserInfo();
    fetchCustomerOrders(idUser); // colocar ID do usuário de forma dinamica
    setLoading(false);
  }, [idUser, history, userToken]);

  return (
    <div>
      { loading && <span>Loading</span>}
      { !loading && <NavBar />}
      { !loading
      && customerOrder.map(({ id, userId, status, saleDate, totalPrice }, index) => (
        <OrderCard
          key={ id }
          saleId={ id }
          userId={ userId }
          order={ `${index + 1}` }
          status={ status }
          saleDate={ saleDate }
          totalPrice={ totalPrice }
        />
      ))}
    </div>
  );
}
