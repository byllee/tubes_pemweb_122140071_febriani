import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Halaman Tidak Ditemukan</h1>
      <p className="not-found-paragraph">Maaf, halaman yang Anda cari tidak tersedia.</p>
      <Link to="/" className="not-found-link">Kembali ke Beranda</Link>
    </div>
  );
};

export default NotFound;
