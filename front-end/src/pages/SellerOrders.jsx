import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import OrderCard from '../components/customerOrders/OrderCard';

export default function SellerOrders() {
  const [sellerOrder, setSellerOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [idUser, setIdUser] = useState();
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const getUserId = () => {
      if (!localStorage.getItem('user')) {
        return history.push('/login');
      }
      const { id, token } = JSON.parse(localStorage.getItem('user'));
      setIdUser(id);
      setUserToken(token);
    };
    const fetchSellerOrders = async (value) => {
      const url = 'http://www.localhost:3001/seller/orders';
      const header = { headers: { Authorization: `${userToken}` } };
      const { data } = await axios.get(url, header);
      const orderByUserId = data.filter((order) => order.sellerId === value);
      console.log(orderByUserId);
      setSellerOrder(orderByUserId);
    };
    getUserId();
    fetchSellerOrders(idUser);
    setLoading(false);
  }, [idUser, history, userToken]);

  return (
    <div>
      { loading && <span>Loading</span>}
      { !loading && <NavBar />}
      { !loading
      && sellerOrder.map(({ id, userId, status, saleDate, totalPrice }, index) => (
        <OrderCard
          key={ id }
          userId={ id }
          sellerId={ userId }
          order={ `${index + 1}` }
          status={ status }
          saleDate={ saleDate }
          totalPrice={ totalPrice }
        />
      ))}
    </div>
  );
}
