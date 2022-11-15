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
  totalPrice,
  deliveryAddress,
  deliveryNumber,
}) {
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
      pathname: `/seller/orders/${value}`,
      state: order,
    });
  };

  return (
    <div
      className="order-card-container"
      onClick={ () => onClick(saleId) }
      aria-hidden="true"
      data-testid={ `seller_orders__element-order-id-${saleId}` }
    >
      <section>
        <span>{`Pedido: ${order}`}</span>
      </section>
      <section data-testid={ `seller_orders__element-delivery-status-${saleId}` }>
        <span>{status}</span>
      </section>
      <section data-testid={ `seller_orders__element-order-date-${saleId}` }>
        <span>{handleSaleDate(saleDate)}</span>
      </section>
      <section data-testid={ `seller_orders__element-card-price-${saleId}` }>
        <span>{replaceHelper(totalPrice)}</span>
      </section>
      <section data-testid={ `seller_orders__element-card-address-${saleId}` }>
        <span>{ `${deliveryAddress}, ${deliveryNumber}`}</span>
      </section>
    </div>
  );
}

OrderCard.propTypes = {
  saleId: PropTypes.string,
}.isRequired;
