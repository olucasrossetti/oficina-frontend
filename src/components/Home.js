import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';  // Verificar autenticação

function Home() {
  return (
    <div className="container">
      <h2>Bem-vindo à Página Inicial!</h2>
      <p>Esta é a página inicial pública do seu aplicativo.</p>

      {/* Exibe o botão de dashboard se o usuário estiver autenticado, senão exibe o botão de login */}
      {isAuthenticated() ? (
        <Link to="/dashboard" className="btn btn-primary">
          Ir para o Dashboard
        </Link>
      ) : (
        <Link to="/login" className="btn btn-primary">
          Login do Administrador
        </Link>
      )}
    </div>
  );
}

export default Home;
