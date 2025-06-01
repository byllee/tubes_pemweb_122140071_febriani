import React, { useEffect } from 'react';
import '../styles/OrderList.css';
import { useOrder } from '../hook/useOrder';  

const OrderList = () => {
  const {
    orders,
    ordersLoading,
    ordersError,
    fetchOrders,
  } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, []); // panggil fetchOrders sekali saat mount

  if (ordersLoading) return <p style={{ textAlign: 'center' }}>Memuat daftar pesanan...</p>;
  if (ordersError) return <p style={{ textAlign: 'center', color: 'red' }}>{ordersError}</p>;
  if (!orders || orders.length === 0) return <p style={{ textAlign: 'center' }}>Belum ada pesanan, silahkan tambahkan pesanan.</p>;

  return (
    <div className="order-list">
      <h2>Form Pesanan</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <p><strong>Nama:</strong> {order.customer.nama}</p>
            <p><strong>Alamat:</strong> {order.customer.alamat}</p>
            <p><strong>Metode Pembayaran:</strong> {order.customer.metode}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Rp {item.price.toLocaleString()}
                </li>
              ))}
            </ul>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
