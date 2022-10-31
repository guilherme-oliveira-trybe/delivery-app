import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrderCard({
  saleId,
  userId,
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
    history.push(`/customer/orders/${value}`);
  };

  return (
    <div onClick={ () => onClick(saleId) } aria-hidden="true">
      <section data-testid={ `customer_orders__element-order-id-${userId}` }>
        <span>{`Pedido: ${order}`}</span>
      </section>
      <section data-testid={ `customer_orders__element-delivery-status-${userId}` }>
        <span>{status}</span>
      </section>
      <section data-testid={ `customer_orders__element-order-date-${userId}` }>
        <span>{handleSaleDate(saleDate)}</span>
      </section>
      <section data-testid={ `customer_orders__element-card-price-${userId}` }>
        <span>{totalPrice}</span>
      </section>
    </div>
  );
}

OrderCard.propTypes = {
  saleId: PropTypes.string,
}.isRequired;
