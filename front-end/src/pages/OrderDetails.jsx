import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import CheckoutTable from '../components/CheckoutTable';

export default function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState();
  const [seller, setSeller] = useState();
  const [saleStatus, setSaleStatus] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const { location: { state } } = history;
  const dataTest = 'customer_order_details__element-order-details-label';
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const getUserInfo = () => {
      if (!localStorage.getItem('user')) {
        return history.push('/login');
      }
      const { token } = JSON.parse(localStorage.getItem('user'));
      setUserToken(token);
    };
    const fetchOrderDetail = async (value) => {
      const url = `http://www.localhost:3001/customer/orders/${value}`;
      const header = { headers: { Authorization: `${userToken}` } };
      const { data } = await axios.get(url, header);
      const [{ products, saleDate, seller: { name }, status }] = data;
      const handleOrder = () => {
        const newOrder = [];
        if (products) {
          products.forEach((el) => {
            const { SalesProduct: { quantity }, price: unitPrice, ...remaingInfo } = el;
            const subTotal = (quantity * unitPrice);
            newOrder.push({ quantity, subTotal, unitPrice, ...remaingInfo });
          });
        }
        return newOrder;
      };
      setOrder(handleOrder());
      setDate(saleDate);
      setSeller(name);
      setSaleStatus(status);
    };
    getUserInfo();
    fetchOrderDetail(id);
    if (order.length > 0) setLoading(false);
  }, [id, history, userToken, order]);

  const handleSaleDate = (value) => {
    if (value) {
      const newDate = value.split('-');
      const day = newDate[2].split('T');
      const mounth = newDate[1];
      const year = newDate[0];

      return `${day[0]}/${mounth}/${year}`;
    }
  };

  // const handleOrder = (arr) => {
  //   const newOrder = [];
  //   if (arr) {
  //     arr.forEach((el) => {
  //       const { SalesProduct: { quantity }, price: unitPrice, ...remaingInfo } = el;
  //       const subTotal = (quantity * unitPrice).toFixed(2);
  //       newOrder.push({ quantity, subTotal, unitPrice, ...remaingInfo });
  //     });
  //   }
  //   return newOrder;
  // };

  const handleOnClick = async () => {
    const url = `http://localhost:3001/customer/orders/${id}`;
    const body = { status: 'Entregue' };
    const { data } = await axios.patch(url, body);
    const [{ status }] = data;
    setSaleStatus(status);
  };

  return (
    <div>
      <NavBar />
      {loading && <span>Carregando...</span>}
      <table>
        <thead>
          <tr>
            <th
              data-testid={ `${dataTest}-order-id` }
            >
              {`Pedido: ${state}`}
            </th>
            <th
              data-testid={ `${dataTest}-seller-name` }
            >
              {`P.Vend: ${seller}`}
            </th>
            <th
              data-testid={ `${dataTest}-order-date` }
            >
              {handleSaleDate(date)}
            </th>
            <th
              data-testid={ `${dataTest}-delivery-status-${id}` }
            >
              {saleStatus}
            </th>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              onClick={ handleOnClick }
              disabled="true"
            >
              MARCAR COMO ENTREGUE

            </button>
          </tr>
        </thead>
      </table>
      {!loading
      && <CheckoutTable
        needButton={ false }
        dateTest="customer_order_details__element-order-table"
        dateTestTotal="customer_order_details"
        cart={ order }
        setCart={ () => {} }
      />}
    </div>
  );
}
