import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Petalora</h1>
      <ul className="nav-links">
        <li><Link to="/">Beranda</Link></li>
        <li><Link to="/catalog">Katalog</Link></li>
        <li><Link to="/favorites">Favorit</Link></li>
        <li><Link to="/cart">Keranjang</Link></li>
        <li><Link to="/login">Masuk</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
