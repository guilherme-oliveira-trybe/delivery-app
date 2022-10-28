// import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Form() {
  const [seller, setSeller] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const history = useHistory();

  const handleClick = () => {
    console.log('envia o pedido, fazer axios.post');
    const { id: orderId } = 'post fake que retorna o id contendo o TOKEN';
    history.push(`/customer/orders/${orderId}`);
  };

  return (
    <form>
      <label htmlFor="seller">
        P. Vendedora Responsável:
        <select
          name="seller"
          id="seller"
          value={ seller }
          onChange={ ({ target: { value } }) => setSeller(value) }
        >
          <option value="V1">Vendedor 1</option>
          <option value="V2">Vendedor 2</option>
        </select>
      </label>

      <label htmlFor="delivery_address">
        Endereço:
        <input
          type="text"
          data-testid=""
          value={ deliveryAddress }
          id="delivery_address"
          onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
        />
      </label>

      <label htmlFor="delivery_number">
        Número:
        <input
          type="text"
          data-testid=""
          value={ deliveryNumber }
          id="delivery_number"
          onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
        />
      </label>
      <button
        type="button"
        onClick={ handleClick }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

Form.propTypes = {};
