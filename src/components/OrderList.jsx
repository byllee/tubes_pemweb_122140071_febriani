import React from 'react';
import '../styles/OrderList.css';
import { useStore } from '../context/StoreContext';

const OrderList = () => {
  const { state } = useStore();

  return (
    <div className="order-list">
      <h2>Daftar Pesanan</h2>

      {state.orders.length === 0 ? (
        <p>Belum ada pesanan.</p>
      ) : (
        <ul>
          {state.orders.map((order) => (
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
      )}
    </div>
  );
};

export default OrderList;
