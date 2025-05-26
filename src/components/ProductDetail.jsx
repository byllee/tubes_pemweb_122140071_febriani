import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(StoreContext);

  // Cari produk berdasarkan id dari URL
  const product = state.products.find((item) => item.id.toString() === id);

  if (!product) {
    return <div style={{ padding: '2rem' }}>Produk tidak ditemukan.</div>;
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert('Produk ditambahkan ke keranjang!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
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
