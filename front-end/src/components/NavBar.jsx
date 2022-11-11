import React from 'react';
import './styles/NavBar.css';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="nav-bar">
      <ul>
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
          >
            MEUS PEDIDOS
          </a>
        </li>
        <li>
          <span
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user.name }
          </span>
        </li>
        <li>
          <a
            href="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.clear() }
          >
            SAIR
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
