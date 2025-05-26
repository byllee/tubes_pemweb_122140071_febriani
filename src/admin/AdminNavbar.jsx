import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styleadmin/AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
  navigate('/'); // Fungsi untuk menavigasi kembali ke halaman sebelumnya
};
  

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-left">
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/products">Produk</NavLink>
        <NavLink to="/admin/orders">Pesanan</NavLink>
      </div>
      <button onClick={handleBack} className="admin-back-button">Kembali</button>
    </nav>
  );
};

export default AdminNavbar;
