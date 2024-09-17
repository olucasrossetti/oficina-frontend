// ClientsList.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function ClientsList() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clients');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      try {
        await api.delete(`/clients/${id}`);
        setClientes(clientes.filter((cliente) => cliente._id !== id));
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/editar-cliente/${id}`);
  };

  const handleAdd = () => {
    navigate('/dashboard/adicionar-cliente');
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Adicionar Cliente
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente._id}>
              <td>{cliente.tipoPessoa}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cpfCnpj}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.observacoes}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(cliente._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cliente._id)}
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

export default ClientsList;
