import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bouquetImage from '../assets/mawar.jpg';
import '../styles/Home.css';

const Home = () => {
  const [flower, setFlower] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setFlower(response.data))
      .catch(error => console.error(error));
  }, []);

  // Ambil hanya 3 produk untuk rekomendasi
  const recommendedFlowers = flower.slice(0, 3);

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
        <div className="flower-grid">
          {recommendedFlowers.map((flower) => (
            <div key={flower.id} className="flower-item">
              <img src={flower.image} alt={flower.name} className="flower-image" />
              <h3 className="flower-name">{flower.name}</h3>
              <p className="flower-price">Rp {flower.price.toLocaleString()}</p>
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
