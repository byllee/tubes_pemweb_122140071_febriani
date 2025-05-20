import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const ProductDetail = () => {
  const { dispatch } = useContext(StoreContext);

  const product = {
    id: 1,
    name: 'Paket Mawar Merah',
    price: 150000,
    description: 'Paket bunga mawar merah segar untuk berbagai acara.',
    imageUrl: 'https://via.placeholder.com/200x200?text=Mawar+Merah' // opsional jika kamu butuh gambar
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert('Produk ditambahkan ke keranjang!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Harga: Rp {product.price.toLocaleString()}</p>
      <button
        onClick={handleAddToCart}
        style={{
          backgroundColor: '#c62828',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          marginTop: '1rem'
        }}
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
};

export default ProductDetail;
