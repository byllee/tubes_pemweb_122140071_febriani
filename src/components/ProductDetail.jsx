import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hook/useProduct';
import { useFavorite } from '../hook/useFavorite';
import '../styles/ProdukDetail.css';

const ProductDetail = () => {
  const { id } = useParams();

  const {
    selectedProduct,
    selectedLoading,
    selectedError,
    fetchProductById,
  } = useProduct();

  const {
    favorites,
    fetchFavorites,
    createFavorite,
    deleteFavorite,
  } = useFavorite();

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    fetchFavorites();
  }, [id, fetchProductById, fetchFavorites]);

  useEffect(() => {
    const product = selectedProduct?.product || selectedProduct;
    if (product) {
      const found = favorites.find(fav => fav.product_id === product.id);
      setIsFavorite(!!found);
      setFavoriteId(found?.id || null);
    }
  }, [favorites, selectedProduct]);

  const toggleFavorite = async () => {
    const product = selectedProduct?.product || selectedProduct;
    if (!product) return;

    try {
      if (isFavorite && favoriteId) {
        await deleteFavorite(favoriteId);
      } else {
        await createFavorite({ product_id: product.id }); // Tanpa user_id
      }
      fetchFavorites(); // Refresh daftar favorit
    } catch (error) {
      alert("Terjadi kesalahan saat mengatur favorit.");
    }
  };

  if (selectedLoading) return <p>Loading...</p>;
  if (selectedError) return <p>{selectedError}</p>;
  if (!selectedProduct) return <p>Produk tidak ditemukan.</p>;

  const product = selectedProduct.product || selectedProduct;

  return (
    <div className="product-detail">
      <h2>{product.nama || product.name}</h2>
      <img
        src={product.image_url || product.gambar || 'https://i.imgur.com/fq6VRTg.jpeg'}
        alt={product.nama || product.name}
        style={{ maxWidth: '300px', marginBottom: '1rem' }}
      />

      <p>Harga: Rp {product.harga?.toLocaleString() || product.price?.toLocaleString()}</p>
      <p>{product.deskripsi || product.description}</p>

      <button
        onClick={toggleFavorite}
        className="favorite-btn"
        style={{
          cursor: 'pointer',
          padding: '0.5rem 1rem',
          backgroundColor: '#451425',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          fontWeight: 'bold',
          marginTop: '1.5rem',
          display: 'block',
          width: '100%',
          maxWidth: '200px',
        }}
        aria-label="Toggle Favorit"
      >
        {isFavorite ? 'Hapus Favorit' : 'Tambah Favorit'}
      </button>
    </div>
  );
};

export default ProductDetail;
