import { useEffect, useState } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import CheckoutForm from '../components/CheckoutForm';
import NavBar from '../components/NavBar';
import './styles/Checkout.css';

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('carrinho'));
    setCart(storage);
    setLoading(false);
  }, [setCart]);

  return (
    <>
      <NavBar />
      <div className="checkout-container">

        <section className="checkout-table-container">
          <h3>Finalizar Pedido</h3>
          {loading ? (
            <h2>Carregando...</h2>
          ) : (
            <CheckoutTable
              needButton
              dateTest="customer_checkout__element-order-table"
              dateTestTotal="customer_checkout"
              cart={ cart }
              setCart={ setCart }
            />
          )}
        </section>

        <section className="checkout-form-container">
          <h3>Detalhes e Endereço para Entrega</h3>
          <CheckoutForm cart={ cart } />
        </section>
      </div>

    </>
  );
}
