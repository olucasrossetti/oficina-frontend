// src/components/PecaForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function PecaForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0.0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Se existe um ID, estamos editando uma peça
      const fetchPeca = async () => {
        try {
          const response = await api.get(`/pecas/${id}`);
          const peca = response.data;
          setNome(peca.nome);
          setDescricao(peca.descricao);
          setQuantidade(peca.quantidade);
          setPreco(peca.preco);
        } catch (error) {
          console.error('Erro ao obter a peça:', error);
        }
      };
      fetchPeca();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const peca = { nome, descricao, quantidade, preco };
    try {
      if (id) {
        // Atualizar peça existente
        await api.put(`/pecas/${id}`, peca);
        alert('Peça atualizada com sucesso!');
      } else {
        // Criar nova peça
        await api.post('/pecas', peca);
        alert('Peça adicionada com sucesso!');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao salvar a peça:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Peça' : 'Adicionar Nova Peça'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Quantidade:</label>
          <input
            type="number"
            className="form-control"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default PecaForm;
