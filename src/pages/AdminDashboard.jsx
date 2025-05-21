import React, { useState } from 'react';
import ProductList from './ProductList';
import OrderFormManager from './OrderFormManager';
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
    </div>
  );
};

export default AdminDashboard;
