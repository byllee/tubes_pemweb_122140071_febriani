import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:6543';

export function useProduct() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedLoading, setSelectedLoading] = useState(false);
  const [selectedError, setSelectedError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error('fetchProducts error:', err);
      setProductsError(err.response?.data?.error || 'Gagal mengambil produk');
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id) => {
    setSelectedLoading(true);
    setSelectedError(null);
    try {
      const res = await axios.get(`${API_BASE}/products/get/${id}`);
      setSelectedProduct(res.data);
      return res.data; // Penting untuk digunakan di Checkout.jsx
    } catch (err) {
      console.error('fetchProductById error:', err);
      setSelectedError(err.response?.data?.error || 'Gagal mengambil produk');
      setSelectedProduct(null);
      return null;
    } finally {
      setSelectedLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (payload) => {
    setActionLoading(true);
    setActionError(null);
    try {
      const res = await axios.post(`${API_BASE}/products/create`, payload);
      await fetchProducts();
      return res.data;
    } catch (err) {
      console.error('createProduct error:', err);
      setActionError(err.response?.data?.error || 'Gagal membuat produk');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id, payload) => {
    setActionLoading(true);
    setActionError(null);
    try {
      const res = await axios.put(`${API_BASE}/products/update/${id}`, payload);
      await fetchProducts();
      return res.data;
    } catch (err) {
      console.error('updateProduct error:', err);
      setActionError(err.response?.data?.error || 'Gagal memperbarui produk');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id) => {
    setActionLoading(true);
    setActionError(null);
    try {
      const res = await axios.delete(`${API_BASE}/products/delete/${id}`);
      await fetchProducts();
      return res.data;
    } catch (err) {
      console.error('deleteProduct error:', err);
      setActionError(err.response?.data?.error || 'Gagal menghapus produk');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  return {
    products,
    productsLoading,
    productsError,
    fetchProducts,

    selectedProduct,
    selectedLoading,
    selectedError,
    fetchProductById, 

    createProduct,
    updateProduct,
    deleteProduct,

    actionLoading,
    actionError,
  };
}
