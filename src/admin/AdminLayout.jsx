import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import '../styleadmin/AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // Kembali ke home user
  };

  return (
    <>
      <nav className="admin-navbar">
        <div className="admin-nav-left">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
        </div>
        <button onClick={handleBack} className="admin-back-button">
          Kembali
        </button>
      </nav>

      <main className="admin-main">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
