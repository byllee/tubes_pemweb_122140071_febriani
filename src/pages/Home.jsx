import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-hero burgundy">
        <h1 className="home-title">Selamat Datang di Petalora</h1>
        <p className="home-subtitle">Toko bunga online dengan pilihan terbaik untuk Anda</p>
        <Link to="/catalog" className="home-button">Lihat Katalog</Link>
      </header>
    </div>
  );
}

export default Home;