import React, { createContext, useContext, useEffect } from 'react';
import { useOrderItem } from '../hook/useOrderItem'; // pastikan path benar

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const {
    orderItems,
    setOrderItems,
    fetchOrderItems,
    createOrderItem,
    deleteOrderItem,
    orderItemsLoading,
    orderItemsError,
    actionLoading,
    actionError,
  } = useOrderItem();

  useEffect(() => {
    fetchOrderItems(); // Ambil data keranjang dari backend saat awal
  }, [fetchOrderItems]);

  const addToCart = async (item) => {
    try {
      const newItem = await createOrderItem(item); // Tambahkan ke backend
      setOrderItems((prev) => (prev ? [...prev, newItem] : [newItem])); // Update state lokal
    } catch (err) {
      console.error('Gagal menambahkan ke keranjang:', err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await deleteOrderItem(id);
      setOrderItems((prev) => prev ? prev.filter((i) => i.id !== id) : []);
    } catch (err) {
      console.error('Gagal menghapus item dari keranjang:', err);
    }
  };

  const clearCart = async () => {
    try {
      if (orderItems && orderItems.length > 0) {
        for (const item of orderItems) {
          await deleteOrderItem(item.id);
        }
        setOrderItems([]);
      }
    } catch (err) {
      console.error('Gagal mengosongkan keranjang:', err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: orderItems || [],
        addToCart,
        removeFromCart,
        clearCart,
        loading: orderItemsLoading || actionLoading,
        error: orderItemsError || actionError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
