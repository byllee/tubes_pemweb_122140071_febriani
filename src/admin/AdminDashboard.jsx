<<<<<<< HEAD
import React, { useState } from 'react';
import ProductList from '../admin/ProductList';
import OrderFormManager from '../admin/OrderFormManager';
import '../styleadmin/AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('products');

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Admin</h1>
      
      <div className="admin-tabs">
        <button onClick={() => setSelectedTab('products')}>Kelola Produk</button>
        <button onClick={() => setSelectedTab('orders')}>Kelola Order Form</button>
      </div>

      <div className="admin-content">
        {selectedTab === 'products' && <ProductList />}
        {selectedTab === 'orders' && <OrderFormManager />}
      </div>
=======
import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Dashboard Admin</h2>
      <p>Selamat datang di dashboard admin. Di sini kamu bisa memantau data penting.</p>
      {/* Tambah konten dashboard sesuai kebutuhan */}
>>>>>>> ceab6be (upgrade frontend lagi)
    </div>
  );
};

export default AdminDashboard;
