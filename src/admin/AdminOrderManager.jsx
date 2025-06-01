import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get('http://localhost:6543/api/orders'); // Sesuaikan endpoint jika perlu
        setOrders(data.orders || data);
      } catch (err) {
        setError('Gagal memuat data pesanan.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <h2>Daftar Pesanan</h2>

      {loading && <p>Memuat data pesanan...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && orders.length === 0 && <p>Tidak ada pesanan.</p>}

      {!loading && !error && orders.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Pesanan</th>
              <th>Nama Pengguna</th>
              <th>Alamat</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Produk</th>
              <th>Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id || order._id}>
                <td>{order.id || order._id}</td>
                <td>{order.username || order.user?.username || order.customerName || order.userName || '—'}</td>
                <td>{order.address || '-'}</td>
                <td>{new Date(order.created_at || order.createdAt || order.date).toLocaleDateString()}</td>
                <td>{order.status || 'Pending'}</td>
                <td>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    {(order.items || []).map(item => (
                      <li key={item.id}>{item.product_name} (x{item.quantity})</li>
                    ))}
                  </ul>
                </td>
                <td>Rp {order.total_price?.toLocaleString() || order.totalPrice?.toLocaleString() || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style>{`
        .admin-orders-container {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          max-width: 1000px;
          margin: 0 auto;
        }

        h2 {
          color: #451425;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .error-message {
          color: red;
          text-align: center;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table th,
        .orders-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #ddd;
          text-align: left;
          vertical-align: top;
        }

        .orders-table th {
          background-color: #f3e9eb;
          color: #451425;
          font-weight: 600;
        }

        .orders-table tr:hover {
          background-color: #f9f2f4;
        }
      `}</style>
    </div>
  );
};

export default AdminOrderManager;
