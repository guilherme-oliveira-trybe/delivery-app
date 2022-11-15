import PropTypes from 'prop-types';
import replaceHelper from '../services/replaceHelper';
import './styles/CheckoutTable.css';

export default function CheckoutTable({
  needButton,
  dateTest,
  dateTestTotal,
  cart,
  setCart,
}) {
  const handleRemove = (indexToRemove) => {
    const cartFilter = cart.filter((_, index) => index !== indexToRemove);
    localStorage.setItem('carrinho', JSON.stringify(cartFilter));
    setCart(cartFilter);
  };

  const total = cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0);

  return (
    <section>
      { cart.length === 0 ? (<h3>Nenhum produto</h3>) : (
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
            {cart.map((order, index) => (
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
                  { replaceHelper(order.unitPrice) }

                </td>
                <td
                  data-testid={ `${dateTest}-sub-total-${index}` }
                >
                  { replaceHelper(order.subTotal.toFixed(2)) }

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
        className="total-price"
        data-testid={ `${dateTestTotal}__element-order-total-price` }
      >
        {`Total: R$${replaceHelper(total.toFixed(2))}`}

      </h3>
    </section>
  );
}

CheckoutTable.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  needButton: PropTypes.bool.isRequired,
  dateTest: PropTypes.string.isRequired,
  dateTestTotal: PropTypes.string.isRequired,
  setCart: PropTypes.func.isRequired,
};
