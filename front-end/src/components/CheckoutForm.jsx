// import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DeliveryContext from '../context/DeliveryContext';

export default function CheckoutForm() {
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const { orders } = useContext(DeliveryContext);
  const history = useHistory();

  const handleClick = () => {
    console.log('envia o pedido, fazer axios.post');
    const token = localStorage.getItem('token');
    const body = {
      userId: 'deve vir do token', // VALIDAR SITUAÇÃO
      sellerId,
      totalPrice: orders.reduce((acc, curr) => acc + Number(curr.subTotal), 0),
      deliveryAddress,
      deliveryNumber,
      orders: [{ productId: 1, quantity: 2 }],
    };
    const { id: orderId } = axios.post(
      'http://localhost:3001/customer/orders',
      body,
      { headers: { Authorization: `${token}` } },
    );
    history.push(`/customer/orders/${orderId}`);
  };

  return (
    <form>
      <label htmlFor="seller">
        P. Vendedora Responsável:
        <select
          data-testid="customer_checkout__select-seller"
          name="seller"
          id="seller"
          value={ sellerId }
          onChange={ ({ target: { value } }) => setSellerId(value) }
        >
          {/* TO_DO: Construir a lista de vendedores possíveis */}
          <option value="V1">Vendedor 1</option>
          <option value="V2">Vendedor 2</option>
        </select>
      </label>

      <label htmlFor="delivery_address">
        Endereço:
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          value={ deliveryAddress }
          id="delivery_address"
          onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
        />
      </label>

      <label htmlFor="delivery_number">
        Número:
        <input
          type="text"
          data-testid="customer_checkout__input-address-number"
          value={ deliveryNumber }
          id="delivery_number"
          onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
        />
      </label>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ handleClick }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

// CheckoutForm.propTypes = {};
