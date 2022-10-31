import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import getAllProducts from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const AllProducts = await getAllProducts();
    setProducts(AllProducts.products);
  };

  useEffect(() => {
    fetchProducts();
  });

  return (
    <div>
      <NavBar />
      <div>
        { products.map((product) => (
          <ProductCard
            key={ product.id }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            urlImage={ product.urlImage }
          />))}
      </div>
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
      >
        Ver Carrinho
      </button>
    </div>
  );
}
