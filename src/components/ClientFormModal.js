// ClientFormModal.js
import React, { useState } from 'react';
import api from '../services/api';

function ClientFormModal({ onClose, onSave }) {
  const [tipoPessoa, setTipoPessoa] = useState('Física');
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [observacoes, setObservacoes] = useState('');

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
      const response = await api.post('/clients', cliente);
      alert('Cliente adicionado com sucesso!');
      onSave(response.data); // Retorna o novo cliente para o componente pai
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: '#000000aa' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Novo Cliente</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Formulário de Cliente (igual ao ClientForm) */}
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
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Fechar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientFormModal;
