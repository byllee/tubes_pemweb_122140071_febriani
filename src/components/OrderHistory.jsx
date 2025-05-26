import React from 'react';;

const OrderHistory = () => {
     const history = [
    { id: 1, item: 'Mawar Merah', date: '2024-05-01' },
    { id: 2, item: 'Lily Putih', date: '2024-05-10' }
  ];

  return (
    <div className="order-history">
      <h2>Riwayat Pesanan</h2>
      <ul>
        {history.map(order => (
          <li key={order.id}>{order.item} - {order.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
