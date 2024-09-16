// src/components/Dashboard.js
import React from 'react';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <h2>Bem-vindo ao Dashboard, Administrador!</h2>
      <p>Esta é a sua área restrita.</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
