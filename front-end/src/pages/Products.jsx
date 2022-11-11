import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import getAllProducts from '../services/api';
import replaceHelper from '../services/replaceHelper';
import './styles/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const AllProducts = await getAllProducts();
      setProducts(AllProducts.products);
    };
    fetchProducts();
    setLoading(false);
  }, [setCart]);

  const total = cart.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);

  const history = useHistory();
  function handleOnClick() {
    history.push('/customer/checkout');
  }

  return (
    <section>
      <NavBar />
      {loading ? (
        <h2>Carregando...</h2>
      ) : (
        <div className="products-background">
          { products.map((product) => (
            <ProductCard
              key={ product.id }
              id={ product.id }
              name={ product.name }
              price={ product.price }
              urlImage={ product.urlImage }
              cart={ cart }
              setCart={ setCart }
            />)) }
          <button
            type="submit"
            data-testid="customer_products__button-cart"
            onClick={ handleOnClick }
            disabled={ cart.length === 0 }
          >
            Ver Carrinho: R$
            {' '}
            <span
              data-testid="customer_products__checkout-bottom-value"
            >
              { replaceHelper(total.toFixed(2)) }
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
