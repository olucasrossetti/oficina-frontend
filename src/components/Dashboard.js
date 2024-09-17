// Dashboard.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PecasList from './PecasList';
import PecaForm from './PecaForm';
import EstoquePage from './EstoquePage';
import ClientsList from './ClientsList';
import ClientForm from './ClientForm';
import Layout from './Layout';
import VehiclesList from './VehiclesList';
import VehicleForm from './VehicleForm';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Layout>
      <div className="container">
        <h2>Dashboard do Administrador</h2>
        <nav>
          <ul className="nav nav-pills mb-3">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Gestão de Peças
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/estoque">
                Estoque de Peças
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/clientes">
                Gestão de Clientes
              </Link>
            </li>
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
          <Route path="estoque" element={<EstoquePage />} />
          <Route path="clientes" element={<ClientsList />} />
          <Route path="adicionar-cliente" element={<ClientForm />} /> 
          <Route path="editar-cliente/:id" element={<ClientForm />} />
          <Route path="veiculos" element={<VehiclesList />} />
          <Route path="adicionar-veiculo" element={<VehicleForm />} />
          <Route path="editar-veiculo/:id" element={<VehicleForm />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default Dashboard;
