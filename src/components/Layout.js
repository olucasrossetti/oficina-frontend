import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Layout.css'; // Caminho correto para o CSS de Layout

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <div className="header">
        <h1>Sistema Oficina</h1>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
