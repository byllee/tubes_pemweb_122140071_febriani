<<<<<<< HEAD
// File: src/components/Checkout/Checkout.js
import React, { useContext } from 'react';
import '../styles/Checkout.css';
import { StoreContext } from '../context/StoreContext'; 

const Checkout = () => {
  const { cart } = useContext(StoreContext);

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    alert(`Checkout berhasil! Total: Rp ${total.toLocaleString()}`);
=======
import React, { useContext, useState } from 'react';
import '../styles/Checkout.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const Checkout = () => {
  const { cart, dispatch } = useContext(StoreContext);
  const [form, setForm] = useState({
    nama: '',
    alamat: '',
    nomor_hp: '',
  });
  const [message, setMessage] = useState('');

  const total = cart.reduce((sum, item) => sum + item.harga * (item.quantity || 1), 0);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      const orderItems = cart.map((item) => ({
        produk_id: item.id,
        jumlah: item.quantity || 1,
        harga_satuan: item.harga,
      }));

      const orderData = {
        nama: form.nama,
        alamat: form.alamat,
        nomor_hp: form.nomor_hp,
        items: orderItems,
      };

      await axios.post('/api/order', orderData);
      setMessage('Pesanan berhasil dibuat!');
      dispatch({ type: 'CLEAR_CART' }); // Kosongkan keranjang
    } catch (err) {
      console.error(err);
      setMessage('Gagal melakukan checkout. Coba lagi.');
    }
>>>>>>> ceab6be (upgrade frontend lagi)
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
<<<<<<< HEAD
      <p>Total belanja Anda adalah <strong>Rp {total.toLocaleString()}</strong></p>
      <button onClick={handleCheckout} disabled={cart.length === 0}>
        Bayar Sekarang
      </button>
=======

      <div className="checkout-form">
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="alamat"
          placeholder="Alamat Lengkap"
          value={form.alamat}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="nomor_hp"
          placeholder="Nomor HP"
          value={form.nomor_hp}
          onChange={handleInputChange}
          required
        />
      </div>

      <p>Total: <strong>Rp {total.toLocaleString()}</strong></p>

      <button onClick={handleCheckout} disabled={cart.length === 0}>
        Bayar Sekarang
      </button>

      {message && <p className="checkout-message">{message}</p>}
>>>>>>> ceab6be (upgrade frontend lagi)
    </div>
  );
};

export default Checkout;
