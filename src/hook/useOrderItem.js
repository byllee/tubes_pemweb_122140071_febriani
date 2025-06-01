import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:6543';

export function useOrderItem() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderItemsLoading, setOrderItemsLoading] = useState(false);
  const [orderItemsError, setOrderItemsError] = useState(null);

  const [fetchedOrderItem, setFetchedOrderItem] = useState(null);
  const [fetchedOrderItemLoading, setFetchedOrderItemLoading] = useState(false);
  const [fetchedOrderItemError, setFetchedOrderItemError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const fetchOrderItems = useCallback(async () => {
    setOrderItemsLoading(true);
    setOrderItemsError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/order_items`);
      setOrderItems(data.order_items || []);
    } catch (error) {
      setOrderItemsError(error.response?.data?.error || 'Gagal mengambil order item');
    } finally {
      setOrderItemsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrderItems();
  }, [fetchOrderItems]);

  async function fetchOrderItemById(id) {
    setFetchedOrderItemLoading(true);
    setFetchedOrderItemError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/order_items/get/${id}`);
      setFetchedOrderItem(data);
      return data;
    } catch (error) {
      setFetchedOrderItemError(error.response?.data?.error || 'Gagal mengambil order item');
      setFetchedOrderItem(null);
      return null;
    } finally {
      setFetchedOrderItemLoading(false);
    }
  }

  async function createOrderItem(payload) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.post(`${API_BASE}/order_items/create`, payload);
      // Update lokal state dengan data baru dari backend
      setOrderItems((prev) => [...prev, data]);
      return data;
    } catch (error) {
      setActionError(error.response?.data?.error || 'Gagal membuat order item');
      throw error;
    } finally {
      setActionLoading(false);
    }
  }

  async function updateOrderItem(id, payload) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.put(`${API_BASE}/order_items/update/${id}`, payload);
      setOrderItems((prev) => prev.map((item) => (item.id === id ? data : item)));
      return data;
    } catch (error) {
      setActionError(error.response?.data?.error || 'Gagal memperbarui order item');
      throw error;
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteOrderItem(id) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.delete(`${API_BASE}/order_items/delete/${id}`);
      setOrderItems((prev) => prev.filter((item) => item.id !== id));
      return data;
    } catch (error) {
      setActionError(error.response?.data?.error || 'Gagal menghapus order item');
      throw error;
    } finally {
      setActionLoading(false);
    }
  }

  return {
    orderItems,
    orderItemsLoading,
    orderItemsError,
    fetchOrderItems,

    fetchedOrderItem,
    fetchedOrderItemLoading,
    fetchedOrderItemError,
    fetchOrderItemById,

    createOrderItem,
    setOrderItems,
    updateOrderItem,
    deleteOrderItem,
    actionLoading,
    actionError,
  };
}