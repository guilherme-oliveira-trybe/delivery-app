import React from 'react';

function SellerNavBar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <a
            href="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            PEDIDOS
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
            Sair
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SellerNavBar;
