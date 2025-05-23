import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">petalora.id</h1>
      </div>

      <ul className="nav-center">
        <li><NavLink to="/" end>Beranda</NavLink></li>
        <li><NavLink to="/catalog">Katalog</NavLink></li>
        <li><NavLink to="/orders">Pesanan</NavLink></li>
      </ul>

      <div className="nav-right">
        <NavLink to="/favorites"><FaHeart /></NavLink>
        <div className="cart-icon">
          <NavLink to="/cart"><FaShoppingCart /></NavLink>
        </div>
        <NavLink to="/login"><FaUser /></NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
