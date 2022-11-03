import { useContext, useEffect } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import DeliveryContext from '../context/DeliveryContext';
import CheckoutForm from '../components/CheckoutForm';
import NavBar from '../components/NavBar';

export default function Checkout() {
  const { loading, setLoading, setOrders, orders } = useContext(DeliveryContext);

  useEffect(() => {
    setOrders([
      {
        productId: 1,
        name: 'Skol Lata 250ml',
        quantity: 2,
        unitPrice: 2.20,
        subTotal: 4.40,
      },
      {
        productId: 2,
        name: 'Heineken 600ml',
        quantity: 4,
        unitPrice: 7.50,
        subTotal: 30.00,
      },
    ]);
    setLoading(false);
  }, [setOrders, setLoading]);

  return (
    <main>
      <NavBar />

      <section>
        <h3>Finalizar Pedido</h3>
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <CheckoutTable
            needButton
            dateTest="customer_checkout__element-order-table"
            dateTestTotal="customer_checkout"
            orders={ orders }
          />
        )}
      </section>

      <section>
        <h3>Detalhes e Endereço para Entrega</h3>
        <CheckoutForm />
      </section>
    </main>
  );
}
