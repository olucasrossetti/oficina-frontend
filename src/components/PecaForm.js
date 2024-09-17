import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function PecaForm() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('ABRAÇADEIRAS'); // Default option
  const [fabricante, setFabricante] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [setor, setSetor] = useState('Sem escolher setor'); // Default option
  const [dataEntrada, setDataEntrada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [estoqueAtual, setEstoqueAtual] = useState(0);
  const [precoTabela, setPrecoTabela] = useState(0.0);
  const [descontoFornecedor, setDescontoFornecedor] = useState(0.0);
  const [precoCompra, setPrecoCompra] = useState(0.0);
  const [lucro, setLucro] = useState(0.0);
  const [precoVenda, setPrecoVenda] = useState(0.0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPeca = async () => {
        try {
          const response = await api.get(`/pecas/${id}`);
          const peca = response.data;
          setNome(peca.nome);
          setCategoria(peca.categoria);
          setFabricante(peca.fabricante);
          setFornecedor(peca.fornecedor);
          setSetor(peca.setor);
          setDataEntrada(peca.dataEntrada);
          setObservacoes(peca.observacoes);
          setEstoqueAtual(peca.estoqueAtual);
          setPrecoTabela(peca.precoTabela);
          setDescontoFornecedor(peca.descontoFornecedor);
          setPrecoCompra(peca.precoCompra);
          setLucro(peca.lucro);
          setPrecoVenda(peca.precoVenda);
        } catch (error) {
          console.error('Erro ao obter a peça:', error);
        }
      };
      fetchPeca();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const peca = { 
      nome, categoria, fabricante, fornecedor, setor, dataEntrada, observacoes, 
      estoqueAtual, precoTabela, descontoFornecedor, precoCompra, lucro, precoVenda 
    };
    try {
      if (id) {
        await api.put(`/pecas/${id}`, peca);
        alert('Peça atualizada com sucesso!');
      } else {
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
          <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        {/* Dropdown for Category */}
        <div className="form-group">
          <label>Categoria:</label>
          <select className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {/* Add your options here */}
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

            {/* Add other options from your list */}
          </select>
        </div>

        <div className="form-group">
          <label>Fabricante / Marca:</label>
          <input type="text" className="form-control" value={fabricante} onChange={(e) => setFabricante(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Fornecedor:</label>
          <input type="text" className="form-control" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} />
        </div>

        {/* Dropdown for Sector */}
        <div className="form-group">
          <label>Setor:</label>
          <select className="form-control" value={setor} onChange={(e) => setSetor(e.target.value)}>
            <option>Sem escolher setor</option>
            <option>1 - MECÂNICA EM GERAL</option>
            <option>2 - ELÉTRICA E ELETRÔNICA</option>
            <option>3 - FUNILARIA E PINTURA</option>
            <option>4 - ALINHAMENTO E BALANCEAMENTO</option>
            <option>5 - LAVAGEM E HIGIENIZAÇÃO</option>
            <option>6 - SUSPENSÃO</option>
            <option>7 - ESTÉTICA</option>
            {/* Add other sector options */}
          </select>
        </div>

        <div className="form-group">
          <label>Data de Entrada:</label>
          <input type="date" className="form-control" value={dataEntrada} onChange={(e) => setDataEntrada(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Observações:</label>
          <textarea className="form-control" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
        </div>

        {/* Inventory and Pricing Section */}
        <div className="form-group">
          <label>Estoque Atual:</label>
          <input type="number" className="form-control" value={estoqueAtual} onChange={(e) => setEstoqueAtual(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Preço de Tabela (R$):</label>
          <input type="number" step="0.01" className="form-control" value={precoTabela} onChange={(e) => setPrecoTabela(e.target.value)} />
        </div>

        <div className="form-group">
          <label>% Desconto do Fornecedor:</label>
          <input type="number" step="0.01" className="form-control" value={descontoFornecedor} onChange={(e) => setDescontoFornecedor(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Preço de Compra (R$):</label>
          <input type="number" step="0.01" className="form-control" value={precoCompra} onChange={(e) => setPrecoCompra(e.target.value)} />
        </div>

        <div className="form-group">
          <label>% de Lucro:</label>
          <input type="number" step="0.01" className="form-control" value={lucro} onChange={(e) => setLucro(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Preço de Venda (R$):</label>
          <input type="number" step="0.01" className="form-control" value={precoVenda} onChange={(e) => setPrecoVenda(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-success">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default PecaForm;
