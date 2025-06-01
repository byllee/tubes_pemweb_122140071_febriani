import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';  // Hapus FaHeart
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      document.body.classList.add('admin');
      document.body.classList.remove('user');
    } else {
      document.body.classList.add('user');
      document.body.classList.remove('admin');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNavLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserMenuOpen(false);
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">petalora.id</h1>
      </div>

      <ul className="nav-center">
        <li><NavLink to="/" end className={getNavLinkClass}>Beranda</NavLink></li>
        <li><NavLink to="/catalog" className={getNavLinkClass}>Katalog</NavLink></li>
        <li><NavLink to="/orders" className={getNavLinkClass}>Pesanan</NavLink></li>
      </ul>

      <div className="nav-right" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        {/* Hapus NavLink Favorit */}
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaShoppingCart />
        </NavLink>

        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          aria-haspopup="true"
          aria-expanded={userMenuOpen}
          className="user-button"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            fontSize: '1.25rem',
          }}
        >
          <FaUser />
        </button>

        {userMenuOpen && (
          <div
            ref={dropdownRef}
            className="user-dropdown"
            style={{
              position: 'absolute',
              top: '2.5rem',
              right: 0,
              backgroundColor: '#6b2a39',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              borderRadius: '6px',
              minWidth: '140px',
              zIndex: 1000,
              fontSize: '0.85rem',
            }}
          >
            {user ? (
              <>
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    color: '#f5f5f5',
                    borderBottom: '1px solid #83414e',
                  }}
                >
                  {user.username || user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="dropdown-link"
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    color: '#f5f5f5',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/auth?mode=login"
                  onClick={() => setUserMenuOpen(false)}
                  className="dropdown-link"
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    color: '#f5f5f5',
                    textDecoration: 'none',
                  }}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth?mode=register"
                  onClick={() => setUserMenuOpen(false)}
                  className="dropdown-link"
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    color: '#f5f5f5',
                    textDecoration: 'none',
                  }}
                >
                  Daftar
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
