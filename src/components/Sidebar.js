// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="nav-sidebar">
      <h3>Oficina</h3>
      <Link to="/">Início</Link>
      <Link to="/dashboard/clientes">Clientes</Link>
      <Link to="/dashboard/veiculos">Veículos</Link>
      <Link to="/ordem-servico">Ordem de Serviço</Link>
      <Link to="/dashboard/estoque">Estoque</Link>
      {/* Outros links conforme necessário */}
    </div>
  );
}

export default Sidebar;
