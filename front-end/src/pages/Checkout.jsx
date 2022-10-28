import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Table from '../components/Table';
import DeliveryContext from '../context/DeliveryContext';
import Form from '../components/Form';

export default function Checkout() {
  const { loading, setLoading, setOrders } = useContext(DeliveryContext);

  useEffect(() => {
    setOrders([
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: 2.20,
        amount: 2,
        url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: 7.50,
        amount: 2,
        url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
      },
    ]);
    setLoading(false);
  }, [setOrders, setLoading]);

  return (
    <main>
      <h1>Checkout</h1>
      <header>
        <Link to="/products">PRODUTOS</Link>
        <Link to="/orders">MEUS PEDIDOS</Link>
        <h3>Nome do usuário</h3>
        <Link to="/">SAIR</Link>
      </header>

      <section>
        <h3>Finalizar Pedido</h3>
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <Table needButton />
        )}
      </section>
      <section>
        <h3>Detalhes e Endereço para Entrega</h3>
        <Form />
      </section>
    </main>
  );
}
