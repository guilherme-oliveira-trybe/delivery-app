import PropTypes from 'prop-types';

export default function CheckoutTable({ needButton, dateTest, dateTestTotal, orders }) {
  const handleRemove = (indexToRemove) => {
    const ordersFilter = orders.filter((_, index) => index !== indexToRemove);
    setOrders(ordersFilter);
  };

  const total = orders.reduce((acc, curr) => acc + Number(curr.subTotal), 0);

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
                <td data-testid={ `${dateTest}-item-number-${index}` }>{ index + 1 }</td>
                <td data-testid={ `${dateTest}-name-${index}` }>{ order.name }</td>
                <td
                  data-testid={ `${dateTest}-quantity-${index}` }
                >
                  { order.quantity }

                </td>
                <td
                  data-testid={ `${dateTest}-unit-price-${index}` }
                >
                  { order.unitPrice }

                </td>
                <td
                  data-testid={ `${dateTest}-sub-total-${index}` }
                >
                  { order.subTotal }

                </td>
                {needButton && (
                  <td>
                    <button
                      data-testid={ `${dateTest}-remove-${index}` }
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
      <h3
        data-testid={ `${dateTestTotal}__element-order-total-price` }
      >
        {`Total: R$${total.toFixed(2)}`}

      </h3>
    </section>
  );
}

CheckoutTable.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  needButton: PropTypes.bool.isRequired,
  dateTest: PropTypes.string.isRequired,
  dateTestTotal: PropTypes.string.isRequired,
};
