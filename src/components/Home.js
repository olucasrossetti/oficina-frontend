// src/components/Home.js
import React from 'react';

function Home() {
  return (
    <div className="container">
      <h2>Bem-vindo à Página Inicial!</h2>
      <p>Esta é a página inicial pública do seu aplicativo.</p>
      <a href="/login" className="btn btn-primary">
        Login do Administrador
      </a>
    </div>
  );
}

export default Home;
