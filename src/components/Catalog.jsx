import React, { useEffect, useState } from 'react';
import '../styles/Catalog.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Catalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products') // Ganti dengan URL API yang sesuai
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="catalog-container">
      <h2>Katalog Bunga</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Rp {product.price}</p>
            <Link to={`/product/${product.id}`}>Lihat Detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
