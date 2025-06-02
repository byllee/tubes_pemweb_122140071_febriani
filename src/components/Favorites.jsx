import React, { useEffect, useState } from 'react';
import { useFavorite } from '../hooks/useFavorite';
import { useProduct } from '../hooks/useProduct';
import { FaTrash } from 'react-icons/fa';
import '../styles/FavoritesPage.css';

const FavoritesPage = () => {
  const { favorites, fetchFavorites, deleteFavorite, createFavorite } = useFavorite();
  const { fetchProductById } = useProduct();

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Ambil semua favorit (tidak tergantung user)
  useEffect(() => {
    fetchFavorites(); // tidak pakai user_id
  }, [fetchFavorites]);

  useEffect(() => {
    const loadFavoriteProducts = async () => {
      const productDetails = await Promise.all(
        favorites.map(async (fav) => {
          const product = await fetchProductById(fav.product_id);
          return {
            ...product.product, // asumsi respons { product: {...} }
            favoriteId: fav.id,
          };
        })
      );
      setFavoriteProducts(productDetails);
    };

    if (favorites.length > 0) {
      loadFavoriteProducts();
    } else {
      setFavoriteProducts([]);
    }
  }, [favorites, fetchProductById]);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:6543/products');
        const data = await response.json();
        setAllProducts(data.products || data);
      } catch (err) {
        console.error('Gagal mengambil produk', err);
      }
    };
    loadAllProducts();
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await deleteFavorite(favoriteId);
      fetchFavorites(); // refresh setelah hapus
    } catch (error) {
      alert('Gagal menghapus favorit');
    }
  };

  const handleAddFavorite = async (productId) => {
    try {
      await createFavorite({ user_id: null, product_id: productId });
      alert('Berhasil menambahkan favorit');
      fetchFavorites(); // refresh setelah tambah
    } catch (error) {
      alert('Gagal menambahkan favorit: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="favorites-page">
      <h2>Produk Favorit</h2>

      {favoriteProducts.length === 0 ? (
        <p>Belum ada produk favorit.</p>
      ) : (
        <div className="favorites-list">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="favorite-item">
              <img
                src={product.image_url || 'https://i.imgur.com/fq6VRTg.jpeg'}
                alt={product.name}
                style={{ width: '120px', height: 'auto' }}
              />
              <div className="info">
                <h4>{product.name}</h4>
                <p>Rp {product.price?.toLocaleString()}</p>
                <button onClick={() => handleRemoveFavorite(product.favoriteId)}>
                  <FaTrash /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr />
      <h3>Tambah Produk ke Favorit</h3>
      <div className="all-products-list">
        {allProducts.length === 0 && <p>Loading produk...</p>}
        {allProducts.map((prod) => (
          <div key={prod.id} className="product-item" style={{ marginBottom: 10 }}>
            <span>{prod.name} - Rp {prod.price?.toLocaleString()}</span>
            <button
              style={{ marginLeft: 10 }}
              onClick={() => handleAddFavorite(prod.id)}
            >
              Tambah ke Favorit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
