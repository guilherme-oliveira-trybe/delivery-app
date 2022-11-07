import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import OrderCard from '../components/sellerOrders/SellerOrderCard';
import SellerNavBar from '../components/SellerNavBar';

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
      return token;
    };
    const fetchSellerOrders = async (token, value) => {
      const url = 'http://www.localhost:3001/seller/orders';
      const header = { headers: { Authorization: `${token}` } };
      const { data } = await axios.get(url, header);
      const orderByUserId = data.filter((order) => order.sellerId === value);
      console.log(orderByUserId);
      setSellerOrder(orderByUserId);
    };
    const token = getUserId();
    fetchSellerOrders(token, idUser);
    setLoading(false);
  }, [idUser, history, userToken]);

  return (
    <div>
      <SellerNavBar />
      { !loading
      && sellerOrder.map(({
        id,
        userId,
        status,
        saleDate,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
      }, index) => (
        <OrderCard
          key={ id }
          saleId={ id }
          sellerId={ userId }
          order={ `${index + 1}` }
          status={ status }
          saleDate={ saleDate }
          totalPrice={ totalPrice }
          deliveryAddress={ deliveryAddress }
          deliveryNumber={ deliveryNumber }
        />
      ))}
    </div>
  );
}
