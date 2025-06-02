import React, { useState } from 'react';
import '../styleadmin/ProductForm.css';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, name, price, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Produk</h3>
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
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Deskripsi"
        required
      />
      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel}>Batal</button>
    </form>
  );
};

export default ProductForm;
