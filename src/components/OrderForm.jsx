import React, { useState } from 'react';
import '../styles/OrderForm.css';
import { useStore } from '../context/StoreContext';

const OrderForm = () => {
  const [data, setData] = useState({ nama: '', alamat: '', metode: '' });
  const { state, dispatch } = useStore();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.cart.length === 0) {
      alert('Keranjang masih kosong!');
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: data,
      items: state.cart,
    };

    dispatch({ type: 'PLACE_ORDER', payload: newOrder });

    // Bertujuan untuk mengosongkan keranjang setelah pemesanan
    setData({ nama: '', alamat: '', metode: '' });

    alert('Pesanan berhasil dikirim!');
  };

  return (
    <div className="order-form">
      <h2>Formulir Pemesanan</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nama"
          placeholder="Nama"
          value={data.nama}
          onChange={handleChange}
          required
        />
        <input
          name="alamat"
          placeholder="Alamat Pengiriman"
          value={data.alamat}
          onChange={handleChange}
          required
        />
        <select
          name="metode"
          value={data.metode}
          onChange={handleChange}
          required
        >
          <option value="">Pilih Metode Pembayaran</option>
          <option value="cod">COD</option>
          <option value="transfer">Transfer Bank</option>
        </select>
        <button type="submit">Pesan Sekarang</button>
      </form>
    </div>
  );
};

export default OrderForm;
