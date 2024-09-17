import React from 'react';
import Layout from '../components/Layout';

function Estoque() {
  return (
    <Layout>
      <div className="form-section">
        <h2>Estoque de Produtos</h2>
        <form>
          <div className="form-group">
            <label>Código de Barras</label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Produto</label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select className="form-control">
              <option>ABRAÇADEIRAS</option>
              <option>DIESEL</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">Salvar</button>
        </form>
      </div>
    </Layout>
  );
}

export default Estoque;
