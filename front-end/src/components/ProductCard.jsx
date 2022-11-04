import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ id, name, price, urlImage, setCart }) {
  const [qtyValue, setQtyValue] = useState(0);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('carrinho')) || [];
    const productFind = storage.find((product) => product.productId === id);
    if (productFind) {
      setQtyValue(productFind.quantity);
    }
  }, [id]);

  const updateToCart = (opt) => {
    const storage = JSON.parse(localStorage.getItem('carrinho')) || [];
    const productIndex = storage.findIndex((product) => product.productId === id);
    if (productIndex < 0) {
      storage.push({
        productId: id,
        name,
        quantity: 1,
        unitPrice: price,
        subTotal: Number(price),
      });
    }
    const quantityUpdate = opt === '+' ? (qtyValue + 1) : (qtyValue - 1);
    const storageUpdate = storage.map((product, index) => {
      if (index === productIndex) {
        return {
          ...product,
          quantity: quantityUpdate,
          subTotal: Number(price) * quantityUpdate,
        };
      }
      return product;
    }).filter((product) => product.quantity > 0);
    localStorage.setItem('carrinho', JSON.stringify(storageUpdate));
    setCart(storageUpdate);
  };

  const updateToCartInput = (number) => {
    const storage = JSON.parse(localStorage.getItem('carrinho')) || [];
    const productIndex = storage.findIndex((product) => product.productId === id);
    if (productIndex < 0) {
      storage.push({
        productId: id,
        name,
        quantity: number,
        unitPrice: price,
        subTotal: Number(price),
      });
    }
    const storageUpdate = storage.map((product, index) => {
      if (index === productIndex) {
        return {
          ...product,
          quantity: number,
          subTotal: Number(price) * number,
        };
      }
      return product;
    }).filter((product) => product.quantity > 0);
    localStorage.setItem('carrinho', JSON.stringify(storageUpdate));
    setCart(storageUpdate);
  };

  const sumValue = () => {
    const sum = qtyValue + 1;
    setQtyValue(sum);
    updateToCart('+');
  };

  const subValue = () => {
    const sub = qtyValue - 1;
    setQtyValue(sub);
    updateToCart('-');
  };

  const handleInputChange = ({ target }) => {
    updateToCartInput(target.value);
    setQtyValue(target.value);
  };

  return (
    <div
      className="cardProductContainer"
    >
      <span>
        R$
        {' '}
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price.replace('.', ',') }
        </span>
      </span>
      <img
        src={ urlImage }
        width="100"
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
          type="number"
          id="productQtyValue"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ qtyValue }
          onChange={ handleInputChange }
        />
        <button
          type="button"
          disabled={ (qtyValue === 0) }
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
  setCart: PropTypes.func.isRequired,
};
