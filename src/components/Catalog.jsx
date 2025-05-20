import React, { useEffect, useState } from 'react';
import '../styles/Catalog.css';
import axios from 'axios';
import FlowerCard from '../components/FlowerCard'; // tambahkan ini

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
          <FlowerCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
