import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import replaceHelper from '../../services/replaceHelper';
import '../styles/OrderCard.css';

export default function OrderCard({
  saleId,
  order,
  status,
  saleDate,
  totalPrice }) {
  const history = useHistory();

  const handleSaleDate = (date) => {
    const newDate = date.split('-');
    const day = newDate[2].split('T');
    const mounth = newDate[1];
    const year = newDate[0];

    return `${day[0]}/${mounth}/${year}`;
  };

  const onClick = (value) => {
    history.push({
      pathname: `/customer/orders/${value}`,
      state: order,
    });
  };

  return (
    <div
      className="order-card-container"
      onClick={ () => onClick(saleId) }
      aria-hidden="true"
    >
      <section>
        <span
          data-testid={ `customer_orders__element-order-id-${saleId}` }
        >
          {`Pedido: ${order}`}
        </span>
      </section>
      <section>
        <span
          data-testid={ `customer_orders__element-delivery-status-${saleId}` }
        >
          {status}
        </span>
      </section>
      <section>
        <span
          data-testid={ `customer_orders__element-order-date-${saleId}` }
        >
          {handleSaleDate(saleDate)}
        </span>
      </section>
      <section>
        <span
          data-testid={ `customer_orders__element-card-price-${saleId}` }
        >
          {replaceHelper(totalPrice)}
        </span>
      </section>
    </div>
  );
}

OrderCard.propTypes = {
  saleId: PropTypes.number,
  order: PropTypes.string,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;
