import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:6543'; 

export function useFavorite() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState(null);

  const [fetchedFavorite, setFetchedFavorite] = useState(null);
  const [fetchedFavoriteLoading, setFetchedFavoriteLoading] = useState(false);
  const [fetchedFavoriteError, setFetchedFavoriteError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const fetchFavorites = useCallback(async (userId) => {
    setFavoritesLoading(true);
    setFavoritesError(null);
    try {
      const url = userId ? `${API_BASE}/favorites?user_id=${userId}` : `${API_BASE}/favorites`;
      const { data } = await axios.get(url);
      setFavorites(data?.favorites || data);
    } catch (error) {
      setFavoritesError(error.response?.data?.error || 'Gagal mengambil favorite');
    } finally {
      setFavoritesLoading(false);
    }
  }, []);

  const fetchFavoriteById = useCallback(async (id) => {
    setFetchedFavoriteLoading(true);
    setFetchedFavoriteError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/favorites/get/${id}`);
      setFetchedFavorite(data);
      return data;
    } catch (error) {
      setFetchedFavoriteError(error.response?.data?.error || 'Gagal mengambil favorite');
      setFetchedFavorite(null);
      return null;
    } finally {
      setFetchedFavoriteLoading(false);
    }
  }, []);

  const createFavorite = useCallback(async (payload) => {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.post(`${API_BASE}/favorites/create`, payload);
      setFavorites(prev => [...prev, data.favorite || data]);
      return data.favorite || data;
    } catch (error) {
      setActionError(error.response?.data?.error || 'Gagal membuat favorite');
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, []);

  const updateFavorite = useCallback(async (id, payload) => {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.put(`${API_BASE}/favorites/update/${id}`, payload);
      setFavorites(prev => prev.map(item => item.id === id ? data : item));
      return data;
    } catch (error) {
      setActionError(error.response?.data?.error || 'Gagal memperbarui favorite');
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, []);

  const deleteFavorite = useCallback(async (id) => {
    setActionLoading(true);
    setActionError(null);
    try {
      await axios.delete(`${API_BASE}/favorites/delete/${id}`);
      setFavorites(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      setActionError(error.response?.data?.error || 'Gagal menghapus favorite');
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, []);

  return {
    favorites,
    favoritesLoading,
    favoritesError,
    fetchFavorites,

    fetchedFavorite,
    fetchedFavoriteLoading,
    fetchedFavoriteError,
    fetchFavoriteById,

    createFavorite,
    updateFavorite,
    deleteFavorite,
    actionLoading,
    actionError,
  };
}
