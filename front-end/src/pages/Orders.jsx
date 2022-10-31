import React, { useEffect, useState } from 'react';
import OrderCard from '../components/customerOrders/OrderCard';
import Navbar from '../components/NavBar';

export default function Orders() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const url = 'http://www.localhost:3001/customer/orders/1';
      const response = await fetch(url);
      const data = await response.json();
      setCustomerOrder(data);
    };
    fetchCustomerOrders();
    setLoading(false);
  }, []);

  console.log(customerOrder);

  return (
    <div>
      <Navbar />
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
