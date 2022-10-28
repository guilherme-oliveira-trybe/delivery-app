import { useContext } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from '../context/DeliveryContext';

export default function Table({ needButton, dateTest }) {
  const { orders, setOrders } = useContext(DeliveryContext);

  const handleRemove = (indexToRemove) => {
    const ordersFilter = orders.filter((_, index) => index !== indexToRemove);
    setOrders(ordersFilter);
  };

  const total = orders.reduce((acc, curr) => {
    acc += Number(curr.subTotal);
    return acc;
  }, 0);

  return (
    <section>
      { orders.length === 0 ? (<h3>Nenhum produto</h3>) : (
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
                <td data-testid={ `${dateTest}-${index}` }>{ order.name }</td>
                <td>{ order.quantity }</td>
                <td>{ order.unitPrice }</td>
                <td>{ order.subTotal }</td>
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
      )}
      <h3>{`Total: R$${total.toFixed(2)}`}</h3>
    </section>
  );
}

Table.propTypes = {
  // orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  needButton: PropTypes.bool.isRequired,
  dateTest: PropTypes.string.isRequired,
};
