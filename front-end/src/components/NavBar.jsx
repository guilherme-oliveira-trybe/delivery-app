import React from 'react';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="box">
        <a
          href="/customer/products/"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </a>
        <a
          href="/customer/orders/"
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </a>
      </div>
      <div className="box">
        <a
          href="/8"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          Nome Usuário
        </a>
        <a
          href="/"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
