import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard(props) {
  const { id, name, price, urlImage } = props;

  const [value, setValue] = useState(0);

  const sumValue = () => {
    const sum = value + 1;
    setValue(sum);
  };

  const subValue = () => {
    const sub = value - 1;
    setValue(sub);
  };

  return (
    <div className="cardProductContainer">
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {`R$${price}`}
      </p>
      <img
        src={ urlImage }
        width="200"
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </p>
      <div>
        <button
          type="button"
          onClick={ () => sumValue() }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ value }
        />
        <button
          type="button"
          disabled={ (value === 0) }
          onClick={ () => subValue() }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
