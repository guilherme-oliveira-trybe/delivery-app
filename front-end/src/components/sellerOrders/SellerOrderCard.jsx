import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrderCard({
  saleId,
  sellerId,
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
      onClick={ () => onClick(saleId) }
      aria-hidden="true"
      data-testid={ `seller_orders__element-order-id-${saleId}` }
    >
      <section>
        <span>{`Pedido: ${order}`}</span>
      </section>
      <section data-testid={ `seller_orders__element-delivery-status-${sellerId}` }>
        <span>{status}</span>
      </section>
      <section data-testid={ `seller_orders__element-order-date-${sellerId}` }>
        <span>{handleSaleDate(saleDate)}</span>
      </section>
      <section data-testid={ `seller_orders__element-card-price-${sellerId}` }>
        <span>{totalPrice.replace(/\./, ',')}</span>
      </section>
      <section data-testid={ `seller_orders__element-card-address-${sellerId}` }>
        <span>{ `${deliveryAddress}, ${deliveryNumber}`}</span>
      </section>
    </div>
  );
}

OrderCard.propTypes = {
  saleId: PropTypes.string,
}.isRequired;
