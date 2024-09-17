// VehiclesList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function VehiclesList() {
  const [veiculos, setVeiculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await api.get('/vehicles');
      setVeiculos(response.data);
    } catch (error) {
      console.error('Erro ao obter veículos:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este veículo?')) {
      try {
        await api.delete(`/vehicles/${id}`);
        setVeiculos(veiculos.filter((veiculo) => veiculo._id !== id));
      } catch (error) {
        console.error('Erro ao deletar veículo:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/editar-veiculo/${id}`);
  };

  const handleAdd = () => {
    navigate('/dashboard/adicionar-veiculo');
  };

  return (
    <div>
      <h2>Lista de Veículos</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Adicionar Veículo
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano Fab/Mod</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo._id}>
              <td>{veiculo.cliente.nome}</td>
              <td>{veiculo.placa}</td>
              <td>{veiculo.marca}</td>
              <td>{veiculo.modelo}</td>
              <td>
                {veiculo.anoFabricacao}/{veiculo.anoModelo}
              </td>
              <td>{veiculo.observacoes}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(veiculo._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(veiculo._id)}
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

export default VehiclesList;
