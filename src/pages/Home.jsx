import React from 'react';
import { Link } from 'react-router-dom';
import bouquetImage from '../assets/mawar.jpg';
import '../styles/Home.css';
import { useProduct } from '../hook/useProduct';

const Home = () => {
  const { products, productsLoading, productsError } = useProduct();

  // Ambil 4 produk pertama sebagai rekomendasi
  const recommendedFlowers = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">Beautiful Flowers for Every Occasion</h1>
            <p className="hero-subtitle">
              Discover our handcrafted bouquets and floral arrangements that bring joy to any moment.
            </p>
            <Link to="/catalog">
              <button className="hero-button">Belanja Sekarang</button>
            </Link>
          </div>
          <div className="hero-image">
            <img src={bouquetImage} alt="Bouquet" className="hero-img" />
          </div>
        </div>
      </section>

      {/* Rekomendasi Terbaik Section */}
      <section className="featured-section">
        <h2 className="section-title">Rekomendasi Terbaik</h2>

        {productsLoading && <p className="loading-message">Memuat produk...</p>}
        {productsError && <p className="error-message">{productsError}</p>}

        <div className="flower-grid">
          {recommendedFlowers.map((flower) => (
            <div key={flower.id} className="flower-item">
              <img
                src={flower.image_url || bouquetImage} // fallback jika image_url tidak ada
                alt={flower.name}
                className="flower-image"
              />
              <h3 className="flower-name">{flower.name}</h3>
              <p className="flower-price">Rp {flower.price.toLocaleString()}</p>
              <p className="flower-stock">
                Stok: {flower.stock !== undefined ? flower.stock : 'Tidak tersedia'}
              </p>
              <Link to={`/product/${flower.id}`}>
                <button className="detail-button">Lihat Detail</button>
              </Link>
            </div>
          ))}
        </div>

        <div className="center-button">
          <Link to="/catalog">
            <button className="view-all-btn">Lihat Semua</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
