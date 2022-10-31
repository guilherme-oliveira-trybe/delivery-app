import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import getAllProducts from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const AllProducts = await getAllProducts();
    setProducts(AllProducts.products);
  };

  const history = useHistory();
  function handleOnClick() {
    history.push('/customer/checkout');
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <button
          type="submit"
          data-testid="customer_products__button-cart"
          onClick={ handleOnClick }
          // disabled={ cart.length === 0 }
        >
          Ver Carrinho:
          {/* <p data-testid="customer_products__checkout-bottom-value">{ total }</p> */}
        </button>
        { products.map((product) => (
          <ProductCard
            key={ product.id }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            urlImage={ product.urlImage }
          />)) }
      </div>
    </div>
  );
}
