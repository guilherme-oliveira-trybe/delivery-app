import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export default function CheckoutForm({ cart }) {
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const updateSellers = async () => {
      const { data } = await api.get('http://localhost:3001/user/role/seller');
      setSellers(data);
    };
    updateSellers();
  }, []);

  const handleClick = async () => {
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const body = {
      userId: id,
      sellerId,
      totalPrice: cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0).toFixed(2),
      deliveryAddress,
      deliveryNumber,
      orders: cart.map(({ productId, quantity }) => ({ productId, quantity })),
    };
    const { data } = await api.post(
      'http://localhost:3001/customer/orders',
      body,
      { headers: { Authorization: `${token}` } },
    );
    history.push({
      pathname: `/customer/orders/${data.id}`,
      state: data.id,
    });
    localStorage.setItem('carrinho', JSON.stringify([]));
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
          <option value="default">Selecionar</option>
          {sellers.length > 0 && sellers.map(({ name, id }) => (
            <option key={ `sellers-${id}` } value={ id }>
              {name}
            </option>
          ))}
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

CheckoutForm.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};
