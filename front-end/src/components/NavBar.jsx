import React from 'react';

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="box">
        <a href="/customer/products/">PRODUTOS</a>
        <a href="/customer/orders/">MEUS PEDIDOS</a>
      </div>
      <div className="box">
        <a href="/8">Nome Usuário</a>
        <a href="/">Sair</a>
      </div>
    </nav>
  );
}

export default Navbar;
