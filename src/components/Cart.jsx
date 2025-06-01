import React, { useEffect } from 'react';
import '../styles/Cart.css';
import { useOrderItem } from '../hook/useOrderItem'; 

const Cart = () => {
  const {
    orderItems,
    setOrderItems,
    orderItemsLoading,
    orderItemsError,
    fetchOrderItems,
    deleteOrderItem,
    actionLoading,
    actionError,
  } = useOrderItem();

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      await deleteOrderItem(id);
      setOrderItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch {
      alert('Gagal menghapus item.');
    }
  };

  if (orderItemsLoading) return <p style={{ textAlign: 'center' }}>Memuat keranjang...</p>;
  if (orderItemsError) return <p style={{ textAlign: 'center', color: 'red' }}>{orderItemsError}</p>;
  if (!orderItems || orderItems.length === 0)
    return <p style={{ textAlign: 'center' }}>Keranjang kosong.</p>;

  return (
    <div className="cart-container">
      <h2>Keranjang Belanja</h2>
      {orderItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img
            src={item.product_image || '/placeholder.jpg'}
            alt={item.product_name || 'Produk'}
            onError={(e) => {
              e.currentTarget.src = '/placeholder.jpg';
            }}
          />
          <div style={{ flexGrow: 1 }}>
            <h4>{item.product_name || 'Produk tanpa nama'}</h4>
            <p>Jumlah: {item.quantity ?? '-'}</p>
          </div>
          <button disabled={actionLoading} onClick={() => handleRemove(item.id)}>
            Hapus
          </button>
        </div>
      ))}
      {actionError && <p style={{ color: 'red', textAlign: 'center' }}>{actionError}</p>}
    </div>
  );
};

export default Cart;
