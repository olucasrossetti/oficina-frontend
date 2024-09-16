// src/components/Dashboard.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PecasList from './PecasList';
import PecaForm from './PecaForm';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <h2>Dashboard do Administrador</h2>
      <nav>
        <ul className="nav nav-pills mb-3">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Gestão de Peças
            </Link>
          </li>
          {/* Você pode adicionar mais links aqui */}
          <li className="nav-item ml-auto">
            <button className="btn btn-danger" onClick={handleLogout}>
              Sair
            </button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<PecasList />} />
        <Route path="adicionar-peca" element={<PecaForm />} />
        <Route path="editar-peca/:id" element={<PecaForm />} />
        {/* Você pode adicionar mais rotas aqui */}
      </Routes>
    </div>
  );
}

export default Dashboard;
