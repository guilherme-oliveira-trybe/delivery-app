import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import replaceHelper from '../services/replaceHelper';
import './styles/sellerOrderCard.css';

export default function SellerOrderCard({
  saleId,
  order,
  status,
  saleDate,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
}) {
  const history = useHistory();

  let statusClass = '';

  if (status === 'Preparando') {
    statusClass = 'seller-order-status-preparando';
  }

  if (status === 'Entregue') {
    statusClass = 'seller-order-status-entregue';
  }

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
      className="seller-order-card-container"
      onClick={ () => onClick(saleId) }
      aria-hidden="true"
      data-testid={ `seller_orders__element-order-id-${saleId}` }
    >
      <div className="seller-order-info">
        <h3 className="seller-order-title">{`Pedido ${order}`}</h3>
        <div className={ `seller-order-status ${statusClass}` }>
          <div
            data-testid={ `seller_orders__element-delivery-status-${saleId}` }
          >
            {status}
          </div>
        </div>
        <ul className="seller-order-date-price">
          <li data-testid={ `seller_orders__element-order-date-${saleId}` }>
            {handleSaleDate(saleDate)}
          </li>
          <li>
            R$
            {' '}
            {' '}
            <span data-testid={ `seller_orders__element-card-price-${saleId}` }>
              {replaceHelper(totalPrice)}
            </span>
          </li>
        </ul>
      </div>
      <div className="seller-order-address-container">
        <p
          className="seller-order-address"
          data-testid={ `seller_orders__element-card-address-${saleId}` }
        >
          { `Endereço: ${deliveryAddress}, ${deliveryNumber}`}
        </p>
      </div>
    </div>
  );
}

SellerOrderCard.propTypes = {
  saleId: PropTypes.string,
}.isRequired;
