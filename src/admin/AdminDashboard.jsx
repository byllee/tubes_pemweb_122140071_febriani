import React, { useState } from 'react';
import ProductList from '../admin/ProductList';
import AdminOrderManager from './AdminOrderManager'; // pastikan file ini ada di src/admin
import '../styleadmin/AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('products');

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Admin</h1>
      <p>Selamat datang di dashboard admin. Di sini kamu bisa memantau dan mengelola data penting.</p>
      
      <div className="admin-tabs">
        <button onClick={() => setSelectedTab('products')}>Kelola Produk</button>
        <button onClick={() => setSelectedTab('orders')}>Kelola Order Form</button>
      </div>

      <div className="admin-content">
        {selectedTab === 'products' && <ProductList />}
        {selectedTab === 'orders' && <AdminOrderManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;
