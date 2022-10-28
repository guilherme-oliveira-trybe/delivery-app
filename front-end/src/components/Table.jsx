import PropTypes from 'prop-types';

export default function Table({ orders, needButton }) {
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
              {needButton && <td><button type="button">Remover</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        {orders.reduce((acc, curr) => {
          acc += (curr.amount * curr.price);
          return acc;
        }, 0)}
      </h3>
    </section>
  );
}

Table.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  needButton: PropTypes.bool.isRequired,
};
