import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import '../styleadmin/AdminLayout.css';

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main className="admin-main">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
