import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles/SellerNavBar.css';

function SellerNavBar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  return (
    <nav className="nav-bar">
      <ul className="box">
        <li>
          <a
            href="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            PEDIDOS
          </a>
        </li>
        <li>
          <p data-testid="customer_products__element-navbar-user-full-name">
            {user.name}
          </p>
        </li>
        <li>
          <a
            href="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => {
              localStorage.clear();
              history.push('/login');
            } }
          >
            Sair
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SellerNavBar;
