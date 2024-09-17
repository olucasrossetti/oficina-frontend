import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';


function EstoquePage() {
  const [pecas, setPecas] = useState([]);
  const [filteredPecas, setFilteredPecas] = useState([]);
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [setorFilter, setSetorFilter] = useState('');
  const [fabricanteFilter, setFabricanteFilter] = useState('');
  const [nomeFilter, setNomeFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Função para buscar as peças da API
    const fetchPecas = async () => {
      try {
        const response = await api.get('/pecas');
        setPecas(response.data);
        setFilteredPecas(response.data);
      } catch (error) {
        console.error('Erro ao buscar as peças:', error);
      }
    };

    fetchPecas();
  }, []);

  // Função para filtrar as peças
  useEffect(() => {
    const filterPecas = () => {
      let filtered = pecas;
  
      if (categoriaFilter) {
        filtered = filtered.filter((peca) => peca.categoria === categoriaFilter);
      }
  
      if (setorFilter) {
        filtered = filtered.filter((peca) => peca.setor === setorFilter);
      }
  
      if (fabricanteFilter) {
        filtered = filtered.filter((peca) => peca.fabricante.toLowerCase().includes(fabricanteFilter.toLowerCase()));
      }
  
      if (nomeFilter) {
        filtered = filtered.filter((peca) => peca.nome.toLowerCase().includes(nomeFilter.toLowerCase()));
      }
  
      setFilteredPecas(filtered);
    };
  
    filterPecas();
  }, [categoriaFilter, setorFilter, fabricanteFilter, nomeFilter, pecas]);  // Não precisa mais incluir filterPecas
  
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

  return (
    <div>
      <h2>Estoque de Peças</h2>
      
      {/* Filtros */}
      <div className="filters">
        <div className="form-group">
          <label>Filtrar por Nome:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite o nome da peça"
            value={nomeFilter}
            onChange={(e) => setNomeFilter(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Filtrar por Categoria:</label>
          <select className="form-control" value={categoriaFilter} onChange={(e) => setCategoriaFilter(e.target.value)}>
            <option value="">Todas</option>
            <option>ABRAÇADEIRAS</option>
            <option>AR CONDICIONADO</option>
            <option>ASSESSÓRIOS</option>
            <option>CAMBIO</option>
            <option>CORREIAS</option>
            <option>COXIM</option>
            <option>DIESEL</option>
            <option>DIREÇÃO HIDRÁULICA</option>
            <option>ELETRICA</option>
            <option>FILTROS</option>
            <option>FREIO</option>
            <option>LATARIA</option>
            <option>LURIFICANTES E ADTIVOS</option>
            <option>MOTOR</option>
            <option>ÓLEO</option>
            <option>PARAFUSO / ARRUELAS</option>
            <option>PERSONALIZADOS</option>
            <option>PROTEÇAO MOTOR</option>
            <option>REPAROS</option>
            <option>RETENTORES</option>
            <option>SUSPENSAO</option>
            {/* Outras opções de categorias */}
          </select>
        </div>

        <div className="form-group">
          <label>Filtrar por Setor:</label>
          <select className="form-control" value={setorFilter} onChange={(e) => setSetorFilter(e.target.value)}>
            <option value="">Todos</option>
            <option>1 - MECÂNICA EM GERAL</option>
            <option>2 - ELÉTRICA E ELETRÔNICA</option>
            <option>3 - FUNILARIA E PINTURA</option>
            <option>4 - ALINHAMENTO E BALANCEAMENTO</option>
            <option>5 - LAVAGEM E HIGIENIZAÇÃO</option>
            <option>6 - SUSPENSÃO</option>
            <option>7 - ESTÉTICA</option>
            {/* Outras opções de setor */}
          </select>
        </div>

        <div className="form-group">
          <label>Filtrar por Fabricante:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite o nome do fabricante"
            value={fabricanteFilter}
            onChange={(e) => setFabricanteFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Tabela de Peças */}
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
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
          {filteredPecas.map((peca) => (
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
                <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(peca._id)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(peca._id)}>
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

export default EstoquePage;
