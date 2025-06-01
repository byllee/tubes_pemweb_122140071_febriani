import React, { useState, useEffect } from 'react';
import '../styles/Checkout.css';
import { useCart } from '../context/StoreContext';
import { useOrder } from '../hook/useOrder';
import { useOrderItem } from '../hook/useOrderItem';
import { useProduct } from '../hook/useProduct';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    nama: '',
    alamat: '',
    nomor_hp: '',
    metode: 'cod',
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createOrder } = useOrder();
  const { createOrderItem } = useOrderItem();
  const { updateProduct, fetchProductById } = useProduct();

  const [realPrices, setRealPrices] = useState({});
  const [realTotal, setRealTotal] = useState(0);

  // Ambil harga terbaru dari database untuk setiap item di cart
  useEffect(() => {
    const fetchRealPrices = async () => {
      const prices = {};
      let total = 0;

      for (const item of cart) {
        const product = await fetchProductById(item.product_id);
        const harga = product?.harga || 0;
        prices[item.product_id] = harga;
        total += harga * (item.quantity || 1);
      }

      setRealPrices(prices);
      setRealTotal(total);
    };

    if (cart.length > 0) {
      fetchRealPrices();
    } else {
      setRealPrices({});
      setRealTotal(0);
    }
  }, [cart, fetchProductById]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage('Keranjang masih kosong!');
      return;
    }

    if (!form.nama || !form.alamat || !form.nomor_hp) {
      setMessage('Mohon lengkapi semua data pemesanan.');
      return;
    }

    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      const orderPayload = {
        nama: form.nama,
        alamat: form.alamat,
        nomor_hp: form.nomor_hp,
        metode_pembayaran: form.metode,
        total: realTotal,
      };

      const orderResponse = await createOrder(orderPayload);
      const orderId = orderResponse.id;

      for (const item of cart) {
        const harga = realPrices[item.product_id] || 0;
        const quantity = item.quantity || 1;

        await createOrderItem({
          order_id: orderId,
          produk_id: item.product_id,
          jumlah: quantity,
          harga_satuan: harga,
        });

        const newStok = item.stok - quantity;
        await updateProduct(item.product_id, { stok: newStok });
      }

      setSuccess(true);
      setMessage('Pesanan berhasil dibuat!');
      clearCart();
      setForm({ nama: '', alamat: '', nomor_hp: '', metode: 'cod' });
    } catch (err) {
      console.error(err);
      setMessage('Gagal melakukan checkout. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

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
        <input
          type="text"
          name="metode"
          value="COD"
          disabled
          className="disabled-input"
        />
      </div>

      <p>Total: <strong>Rp {realTotal.toLocaleString('id-ID')}</strong></p>

      {success && (
        <div className="checkout-success">
          <h3>✅ Pesanan Anda berhasil!</h3>
          <p>Terima kasih telah memesan. Kami akan segera memproses pesanan Anda.</p>
        </div>
      )}

      <button onClick={handleCheckout} disabled={cart.length === 0 || loading}>
        {loading ? 'Memproses...' : 'Bayar Sekarang'}
      </button>

      {message && !success && (
        <p className="checkout-message">{message}</p>
      )}
    </div>
  );
};

export default Checkout;
