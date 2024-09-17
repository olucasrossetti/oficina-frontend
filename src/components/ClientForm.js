// ClientForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function ClientForm() {
  const [tipoPessoa, setTipoPessoa] = useState('Física');
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCliente();
    }
  }, [id]);

  const fetchCliente = async () => {
    try {
      const response = await api.get(`/clients/${id}`);
      const cliente = response.data;
      setTipoPessoa(cliente.tipoPessoa);
      setNome(cliente.nome);
      setCpfCnpj(cliente.cpfCnpj);
      setTelefone(cliente.telefone);
      setEndereco(cliente.endereco);
      setObservacoes(cliente.observacoes);
    } catch (error) {
      console.error('Erro ao carregar cliente:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cliente = {
      tipoPessoa,
      nome,
      cpfCnpj,
      telefone,
      endereco,
      observacoes,
    };

    try {
      if (id) {
        await api.put(`/clients/${id}`, cliente);
        alert('Cliente atualizado com sucesso!');
      } else {
        await api.post('/clients', cliente);
        alert('Cliente adicionado com sucesso!');
      }
      navigate('/dashboard/clientes');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo de Pessoa</label>
          <select
            className="form-control"
            value={tipoPessoa}
            onChange={(e) => setTipoPessoa(e.target.value)}
            required
          >
            <option value="Física">Física</option>
            <option value="Jurídica">Jurídica</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>{tipoPessoa === 'Física' ? 'CPF' : 'CNPJ'}</label>
          <input
            type="text"
            className="form-control"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <input
            type="text"
            className="form-control"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Endereço</label>
          <input
            type="text"
            className="form-control"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
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
    </div>
  );
}

export default ClientForm;
