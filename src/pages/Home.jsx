import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlowerCard from '../components/FlowerCard';
import bouquetImage from '../assets/mawar.jpg';
import '../styles/Home.css';

const Home = () => {
  const [flower, setFlower] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setFlower(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <section className="home-hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">Beautiful Flowers for Every Occasion</h1>
            <p className="hero-subtitle">
              Discover our handcrafted bouquets and floral arrangements that bring joy to any moment.
            </p>
            <button className="hero-button">Belanja Sekarang</button>
          </div>
          <div className="hero-image">
            <img src={bouquetImage} alt="Bouquet" className="hero-img" />
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Rekomendasi Terbaik</h2>
        <div className="product-grid">
          {flower.slice(0, 3).map((flower) => (
            <FlowerCard key={flower.id} flower={flower} />
          ))}
        </div>
        <div className="center-button">
          <button className="view-all-btn">Lihat Semua</button>
        </div>
      </section>
    </>
  );
};

export default Home;
