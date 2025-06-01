import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Komponen Umum
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import OrderList from './components/OrderList';
import Checkout from './components/Checkout';
import AuthForm from './components/AuthForm';

// Halaman
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Admin
import AdminDashboard from './admin/AdminDashboard';
import AdminLayout from './admin/AdminLayout';
import AdminOrderManager from './admin/AdminOrderManager';
import ProductList from './admin/ProductList';
import ProductFormWrapper from './admin/ProductForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* Rute Umum */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<AuthForm />} />

            {/* Rute Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrderManager />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/add" element={<ProductFormWrapper mode="add" />} />
              <Route path="products/:id/edit" element={<ProductFormWrapper mode="edit" />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Rute Tidak Ditemukan */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
