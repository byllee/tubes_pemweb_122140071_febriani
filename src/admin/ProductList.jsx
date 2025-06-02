import React, { useState, useEffect } from 'react';
import { useProduct } from '../hook/useProduct';
import ProductForm from './ProductForm';
import '../styleadmin/ProductList.css';

const ProductList = () => {
  const { products, productsLoading, productsError, fetchProducts, deleteProduct, updateProduct, createProduct } = useProduct();
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleUpdate = async (updatedProduct) => {
    try {
      // Perbaikan: kirimkan id dan payload terpisah
      await updateProduct(updatedProduct.id, updatedProduct);
      alert('Produk berhasil diperbarui');
      fetchProducts();
      setEditingProduct(null);
      setAddingNew(false);
    } catch (err) {
      console.error('Gagal update produk:', err);
      alert('Gagal memperbarui produk');
    }
  };

  const handleAdd = async (newProduct) => {
    try {
      await createProduct(newProduct);
      alert('Produk berhasil ditambahkan');
      fetchProducts();
      setAddingNew(false);
    } catch {
      alert('Gagal menambahkan produk');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
        alert('Produk berhasil dihapus');
        fetchProducts();
      } catch {
        alert('Gagal menghapus produk');
      }
    }
  };

  if (productsLoading) return <p>Loading...</p>;
  if (productsError) return <p>{productsError}</p>;

  return (
    <div className="product-list">
      <h2>Daftar Produk</h2>
      <button onClick={() => { setAddingNew(true); setEditingProduct(null); }}>Tambah Produk</button>

      <ul>
        {products.map(product => (
          <li key={product.id} className="product-item">
            <strong>{product.name}</strong> - Rp {product.price.toLocaleString()}
            <br />
            <em>{product.description}</em>
            <br />
            <button onClick={() => { setEditingProduct(product); setAddingNew(false); }}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Hapus</button>
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

      {addingNew && (
        <ProductForm
          product={{ name: '', price: 0, description: '' }}
          onSave={handleAdd}
          onCancel={() => setAddingNew(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
