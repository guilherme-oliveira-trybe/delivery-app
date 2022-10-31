import React from 'react';

function NavBar() {
  // const user = JSON.parse(localStorage.getItem('user'));

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
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {/* { user.name } */}
          Nome do usuário
        </p>
        <a
          href="/"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ localStorage.clear() }
        >
          Sair
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
