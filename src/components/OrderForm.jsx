import React, { useState } from 'react';
import '../styles/OrderForm.css';

const OrderForm = () => {
  const [data, setData] = useState({ nama: '', alamat: '', metode: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pesanan dikirim:', data);
  };

  return (
    <div className="order-form">
      <h2>Formulir Pemesanan</h2>
      <form onSubmit={handleSubmit}>
        <input name="nama" placeholder="Nama Lengkap" onChange={handleChange} required />
        <input name="alamat" placeholder="Alamat Pengiriman" onChange={handleChange} required />
        <select name="metode" onChange={handleChange} required>
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
