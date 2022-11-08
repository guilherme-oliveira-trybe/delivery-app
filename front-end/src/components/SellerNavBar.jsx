import React from 'react';

function SellerNavBar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="nav-bar">
      <div className="box">
        <a
          href="/seller/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          PEDIDOS
        </a>
      </div>
      <div className="box">
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </p>
        <a
          href="/"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </a>
      </div>
    </nav>
  );
}

export default SellerNavBar;
