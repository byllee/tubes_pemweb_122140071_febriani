import React from 'react';
import '../styles/Cart.css';
import { useStore } from '../context/StoreContext';

const Cart = () => {
  const { state, removeFromCart } = useStore();
  const cartItems = state.cart;

  return (
    <div className="cart-container">
      <h2>Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Rp {item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Hapus</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
