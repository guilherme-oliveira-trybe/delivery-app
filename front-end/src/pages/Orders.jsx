import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import OrderCard from '../components/customerOrders/OrderCard';

export default function Orders() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [idUser, setIdUser] = useState();

  useEffect(() => {
    const getUserId = () => {
      if (!localStorage.getItem('user')) {
        return history.push('/login');
      }
      const { id } = JSON.parse(localStorage.getItem('user'));
      setIdUser(id);
    };
    const fetchCustomerOrders = async (value) => {
      const url = 'http://www.localhost:3001/customer/orders';
      const response = await fetch(url);
      const data = await response.json();
      const orderByUserId = data.filter((order) => order.userId === value);
      setCustomerOrder(orderByUserId);
    };
    getUserId();
    fetchCustomerOrders(idUser); // colocar ID do usuário de forma dinamica
    setLoading(false);
  }, [idUser, history]);

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
