import React, { useEffect, useState } from 'react';
import '../styles/Catalog.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="catalog-container">
      <h2>Katalog Bunga</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">Rp {product.price.toLocaleString()}</p>
            <Link to={`/product/${product.id}`}>
              <button className="detail-button">Lihat Detail</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
