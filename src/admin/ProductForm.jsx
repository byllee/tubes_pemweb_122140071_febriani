import React, { useState } from 'react';
import '../styleadmin/ProductForm.css';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [imageUrl, setImageUrl] = useState(product.image_url || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...product,
      name,
      price,
      description,
      image_url: imageUrl,
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{product.id ? 'Edit Produk' : 'Tambah Produk'}</h3>

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nama Produk"
        required
      />

      <input
        type="number"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        placeholder="Harga"
        required
        min="0"
        step="0.01"
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Deskripsi"
        required
      />

      <input
        type="text"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        placeholder="URL Gambar"
      />

      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel}>Batal</button>
    </form>
  );
};

export default ProductForm;
