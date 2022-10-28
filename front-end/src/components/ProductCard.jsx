import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard(props) {
  const { id, name, image, price } = props;

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
        {`R$ ${price}`}
      </p>
      <img
        src={ image }
        width="200"
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p>{name}</p>
      <div>
        <button
          type="button"
          onClick={ () => sumValue() }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>
        <p>{value}</p>
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
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
