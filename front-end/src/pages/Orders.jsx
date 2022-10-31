import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/customerOrders/OrderCard';

export default function Orders() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const url = 'http://www.localhost:3001/customer/orders/1'; // colocar userId de forma dinâmica
      const response = await fetch(url);
      const data = await response.json();
      setCustomerOrder(data);
    };
    fetchCustomerOrders();
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
