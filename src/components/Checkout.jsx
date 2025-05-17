// File: src/components/Checkout/Checkout.js
import React, { useContext } from 'react';
import '../../styles/Checkout.css';
import { StoreContext } from '../../context/StoreContext'; 

const Checkout = () => {
  const { cart } = useContext(StoreContext);

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    alert(`Checkout berhasil! Total: Rp ${total.toLocaleString()}`);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>Total belanja Anda adalah <strong>Rp {total.toLocaleString()}</strong></p>
      <button onClick={handleCheckout} disabled={cart.length === 0}>
        Bayar Sekarang
      </button>
    </div>
  );
};

export default Checkout;
