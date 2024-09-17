import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function PecasList() {
  const [pecas, setPecas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPecas = async () => {
      try {
        const response = await api.get('/pecas');
        setPecas(response.data);
      } catch (error) {
        console.error('Erro ao obter as peças:', error);
      }
    };

    fetchPecas();
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/editar-peca/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta peça?')) {
      try {
        await api.delete(`/pecas/${id}`);
        setPecas(pecas.filter((peca) => peca._id !== id));
      } catch (error) {
        console.error('Erro ao deletar a peça:', error);
      }
    }
  };

  const handleAdd = () => {
    navigate('/dashboard/adicionar-peca');
  };

  return (
    <div>
      <h2>Lista de Peças</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Adicionar Nova Peça
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Fabricante</th>
            <th>Fornecedor</th>
            <th>Setor</th>
            <th>Data de Entrada</th>
            <th>Estoque Atual</th>
            <th>Preço de Tabela (R$)</th>
            <th>Preço de Venda (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pecas.map((peca) => (
            <tr key={peca._id}>
              <td>{peca.nome}</td>
              <td>{peca.categoria}</td>
              <td>{peca.fabricante}</td>
              <td>{peca.fornecedor}</td>
              <td>{peca.setor}</td>
              <td>{new Date(peca.dataEntrada).toLocaleDateString()}</td>
              <td>{peca.estoqueAtual}</td>
              <td>R$ {peca.precoTabela.toFixed(2)}</td>
              <td>R$ {peca.precoVenda.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(peca._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(peca._id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PecasList;
