// context/ProductContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:6543/products');
      setProducts(res.data.products || res.data); // pastikan backend sesuai
    } catch (e) {
      console.error("fetchProducts error:", e);
      setError("Gagal mengambil produk");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:6543/products/update/${id}`, updatedProduct);
      fetchProducts(); // Refresh produk
    } catch (e) {
      throw e;
    }
  };

  const createProduct = async (payload) => {
    try {
      await axios.post(`http://localhost:6543/products/create`, payload);
      fetchProducts();
    } catch (e) {
      throw e;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:6543/products/delete/${id}`);
      fetchProducts();
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        updateProduct,
        createProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => React.useContext(ProductContext);
