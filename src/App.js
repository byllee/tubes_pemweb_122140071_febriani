import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Favorites from './components/Favorites';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderHistory from './components/OrderHistory';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './pages/NotFound';
import Home from './pages/Home'; 
import { StoreProvider } from './context/StoreContext';

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* ⬅️ Beranda utama */}
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order-form" element={<OrderForm />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </StoreProvider>
  );
};

export default App;

