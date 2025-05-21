import React, { useState } from 'react';
import ProductForm from './ProductForm';
import '../styleadmin/ProductList.css';

const initialProducts = [
  { id: 1, name: 'Produk A', price: 100000, description: 'Deskripsi A' },
  { id: 2, name: 'Produk B', price: 200000, description: 'Deskripsi B' },
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
  };

  return (
    <div>
      <h2>Daftar Produk</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Rp{product.price}
            <br />
            <em>{product.description}</em>
            <br />
            <button onClick={() => setEditingProduct(product)}>Edit</button>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={handleUpdate}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
