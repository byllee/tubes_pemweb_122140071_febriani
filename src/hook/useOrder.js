import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Ganti ini sesuai alamat backend kamu
const API_BASE = 'http://localhost:6543';

export function useOrder() {
  const [orders, setOrders] = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  const [fetchedOrder, setFetchedOrder] = useState(null);
  const [fetchedOrderLoading, setFetchedOrderLoading] = useState(false);
  const [fetchedOrderError, setFetchedOrderError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/orders`);
      setOrders(data.orders || []); // pastikan default array
    } catch (err) {
      setOrdersError(err.response?.data?.error || 'Gagal mengambil orders');
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (orders === null) {
      fetchOrders();
    }
  }, [orders, fetchOrders]);

  async function fetchOrderById(id) {
    setFetchedOrderLoading(true);
    setFetchedOrderError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/orders/get/${id}`);
      setFetchedOrder(data);
      return data;
    } catch (err) {
      setFetchedOrderError(err.response?.data?.error || 'Gagal mengambil order');
      setFetchedOrder(null);
      return null;
    } finally {
      setFetchedOrderLoading(false);
    }
  }

  async function createOrder(payload) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.post(`${API_BASE}/orders/create`, payload);
      return data;
    } catch (err) {
      setActionError(err.response?.data?.error || 'Gagal membuat order');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function updateOrder(id, payload) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.put(`${API_BASE}/orders/update/${id}`, payload);
      return data;
    } catch (err) {
      setActionError(err.response?.data?.error || 'Gagal memperbarui order');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteOrder(id) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.delete(`${API_BASE}/orders/delete/${id}`);
      return data;
    } catch (err) {
      setActionError(err.response?.data?.error || 'Gagal menghapus order');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  return {
    orders,
    ordersLoading,
    ordersError,
    fetchOrders,

    fetchedOrder,
    fetchedOrderLoading,
    fetchedOrderError,
    fetchOrderById,

    createOrder,
    updateOrder,
    deleteOrder,
    actionLoading,
    actionError,
  };
}
