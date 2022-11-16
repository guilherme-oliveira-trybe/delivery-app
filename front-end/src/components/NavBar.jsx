import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  return (
    <nav className="nav-bar">
      <ul className="box">
        <li>
          <a
            href="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </a>
        </li>
        <li>
          <a
            href="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => {
              history.push('/customer/orders');
            } }
          >
            MEUS PEDIDOS
          </a>
        </li>
        <li>
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user.name }
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

export default NavBar;
