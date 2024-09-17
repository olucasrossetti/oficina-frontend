// VehicleForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import ClientFormModal from './ClientFormModal'; // Novo componente para o modal

function VehicleForm() {
  const [clienteId, setClienteId] = useState('');
  const [clienteNome, setClienteNome] = useState('');
  const [clientesSugestoes, setClientesSugestoes] = useState([]);
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [anoModelo, setAnoModelo] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchVeiculo();
    }
  }, [id]);

  const fetchVeiculo = async () => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      const veiculo = response.data;
      setClienteId(veiculo.cliente._id);
      setClienteNome(veiculo.cliente.nome);
      setPlaca(veiculo.placa);
      setMarca(veiculo.marca);
      setModelo(veiculo.modelo);
      setAnoFabricacao(veiculo.anoFabricacao);
      setAnoModelo(veiculo.anoModelo);
      setObservacoes(veiculo.observacoes);
    } catch (error) {
      console.error('Erro ao carregar veículo:', error);
    }
  };

  const handleClienteChange = async (e) => {
    const valor = e.target.value;
    setClienteNome(valor);

    if (valor.length >= 2) {
      try {
        const response = await api.get('/clients', {
          params: { nome: valor },
        });
        setClientesSugestoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    } else {
      setClientesSugestoes([]);
    }
  };

  const handleClienteSelect = (cliente) => {
    setClienteId(cliente._id);
    setClienteNome(cliente.nome);
    setClientesSugestoes([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clienteId) {
      alert('Por favor, selecione um cliente válido.');
      return;
    }

    const veiculo = {
      cliente: clienteId,
      placa,
      marca,
      modelo,
      anoFabricacao,
      anoModelo,
      observacoes,
    };

    try {
      if (id) {
        await api.put(`/vehicles/${id}`, veiculo);
        alert('Veículo atualizado com sucesso!');
      } else {
        await api.post('/vehicles', veiculo);
        alert('Veículo adicionado com sucesso!');
      }
      navigate('/dashboard/veiculos');
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Veículo' : 'Adicionar Veículo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cliente</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={clienteNome}
              onChange={handleClienteChange}
              required
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setMostrarModalCliente(true)}
              >
                Novo Cliente
              </button>
            </div>
          </div>
          {clientesSugestoes.length > 0 && (
            <ul className="list-group">
              {clientesSugestoes.map((cliente) => (
                <li
                  key={cliente._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleClienteSelect(cliente)}
                  style={{ cursor: 'pointer' }}
                >
                  {cliente.nome} - {cliente.cpfCnpj}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-group">
          <label>Placa</label>
          <input
            type="text"
            className="form-control"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            required
          />
        </div>
        <div className="form-group">
          <label>Marca</label>
          <input
            type="text"
            className="form-control"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Modelo</label>
          <input
            type="text"
            className="form-control"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ano Fabricação</label>
          <input
            type="number"
            className="form-control"
            value={anoFabricacao}
            onChange={(e) => setAnoFabricacao(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ano Modelo</label>
          <input
            type="number"
            className="form-control"
            value={anoModelo}
            onChange={(e) => setAnoModelo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Observações</label>
          <textarea
            className="form-control"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>

      {/* Modal para adicionar novo cliente */}
      {mostrarModalCliente && (
        <ClientFormModal
          onClose={() => setMostrarModalCliente(false)}
          onSave={(novoCliente) => {
            setClienteId(novoCliente._id);
            setClienteNome(novoCliente.nome);
            setMostrarModalCliente(false);
          }}
        />
      )}
    </div>
  );
}

export default VehicleForm;
