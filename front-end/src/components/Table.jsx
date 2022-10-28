import { useContext } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from '../context/DeliveryContext';

export default function Table({ needButton }) {
  const { orders, setOrders } = useContext(DeliveryContext);

  const handleRemove = (indexToRemove) => {
    const ordersFilter = orders.filter((_, index) => index !== indexToRemove);
    setOrders(ordersFilter);
  };

  const total = orders.reduce((acc, curr) => {
    acc += (curr.amount * curr.price);
    return acc;
  }, 0);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {needButton && <th>Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={ index }>
              <td>{ index + 1 }</td>
              <td data-testid={ `element-order-table-name-${index}` }>{ order.name }</td>
              <td>{ order.amount }</td>
              <td>{ order.price }</td>
              <td>{ order.amount * order.price }</td>
              {needButton && (
                <td>
                  <button
                    type="button"
                    onClick={ () => handleRemove(index) }
                  >
                    Remover
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{`Total: ${total}`}</h3>
    </section>
  );
}

Table.propTypes = {
  // orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  needButton: PropTypes.bool.isRequired,
};
