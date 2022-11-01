import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/customerOrders/OrderCard';

export default function Orders() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchCustomerOrders = async (value) => {
      const url = 'http://www.localhost:3001/customer/orders';
      const response = await fetch(url);
      const data = await response.json();
      const orderByUserId = data.filter((order) => order.userId === value);
      setCustomerOrder(orderByUserId);
    };
    fetchCustomerOrders(1); // colocar ID do usuário de forma dinamica
    setLoading(false);
  }, []);

  return (
    <div>
      <NavBar />
      { loading && <span>Loading</span>}
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
