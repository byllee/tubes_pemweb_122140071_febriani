import React, { useState } from 'react';
import '../styles/OrderForm.css';
import { useStore } from '../context/StoreContext';
import axios from 'axios';

const OrderForm = () => {
  const [data, setData] = useState({ nama: '', alamat: '', metode: '', nomor_hp: '' });
  const { state, dispatch } = useStore();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.cart.length === 0) {
      alert('Keranjang masih kosong!');
      return;
    }

    const orderPayload = {
      nama: data.nama,
      alamat: data.alamat,
      nomor_hp: data.nomor_hp,
      metode_pembayaran: data.metode,
      items: state.cart.map(item => ({
        produk_id: item.id,
        jumlah: item.quantity || 1,
        harga_satuan: item.price
      }))
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/order', orderPayload);

      dispatch({ type: 'CLEAR_CART' }); // Kosongkan keranjang
      setData({ nama: '', alamat: '', metode: '', nomor_hp: '' }); // Reset form
      alert('Pesanan berhasil dikirim!');
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim pesanan.');
    } finally {
      setLoading(false);
    }
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
        <input
          name="nomor_hp"
          placeholder="Nomor HP"
          value={data.nomor_hp}
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
        <button type="submit" disabled={loading}>
          {loading ? 'Mengirim...' : 'Pesan Sekarang'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
