import React from 'react';

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="box">
        <button type="button">
          PRODUTOS
        </button>
        <button type="button">
          MEUS PEDIDOS
        </button>
      </div>
      <div className="box">
        <button type="button">
          Nome Usuário
        </button>
        <button type="button">
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
