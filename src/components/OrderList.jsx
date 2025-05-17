import React from 'react';
import '../styles/OrderList.css';

const OrderList = () => {
  const dummyOrders = [
    { id: 1, name: 'Paket Mawar Merah', price: 150000 },
    { id: 2, name: 'Buket Lily Putih', price: 200000 }
  ];

  return (
    <div className="order-list">
      <h2>Daftar Pesanan</h2>
      <ul>
        {dummyOrders.map((order) => (
          <li key={order.id}>{order.name} - Rp {order.price.toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
