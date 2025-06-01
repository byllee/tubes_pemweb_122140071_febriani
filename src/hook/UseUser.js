import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:6543';

export function useUser() {
  const [users, setUsers] = useState(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);

  const [fetchedUser, setFetchedUser] = useState(null);
  const [fetchedUserLoading, setFetchedUserLoading] = useState(false);
  const [fetchedUserError, setFetchedUserError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  async function fetchUsers() {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/users`);
      setUsers(data.users);
      return data.users;
    } catch (err) {
      setUsersError(err.response?.data?.error || 'Gagal mengambil data user');
      return null;
    } finally {
      setUsersLoading(false);
    }
  }

  async function fetchUserById(id) {
    setFetchedUserLoading(true);
    setFetchedUserError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/users/get/${id}`);
      setFetchedUser(data);
      return data;
    } catch (err) {
      setFetchedUserError(err.response?.data?.error || 'Gagal mengambil data user');
      setFetchedUser(null);
      return null;
    } finally {
      setFetchedUserLoading(false);
    }
  }

  async function createUser({ username, email, password }) {
    setActionLoading(true);
    setActionError(null);

    if (!username || !email || !password) {
      const errorMsg = 'Username, email, dan password wajib diisi';
      setActionError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      const { data } = await axios.post(
        `${API_BASE}/users/register`,
        { username, email, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data;
    } catch (err) {
      console.error('Error createUser:', err.response || err.message || err);
      setActionError(err.response?.data?.error || 'Gagal membuat user');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function loginUser(email, password, role = 'user') {
  setActionLoading(true);
  setActionError(null);
  try {
    const { data } = await axios.post(`${API_BASE}/users/login`, {
      email,
      password,
      role 
    });
    return data.user;
  } catch (err) {
    console.error('Error loginUser:', err.response || err.message || err);
    setActionError(err.response?.data?.error || 'Gagal login');
    throw err;
  } finally {
    setActionLoading(false);
  }
}



  async function updateUser(id, payload) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.put(
        `${API_BASE}/users/update/${id}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data;
    } catch (err) {
      console.error('Error updateUser:', err.response || err.message || err);
      setActionError(err.response?.data?.error || 'Gagal memperbarui user');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteUser(id) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { data } = await axios.delete(`${API_BASE}/users/delete/${id}`);
      return data;
    } catch (err) {
      console.error('Error deleteUser:', err.response || err.message || err);
      setActionError(err.response?.data?.error || 'Gagal menghapus user');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  return {
    users,
    usersLoading,
    usersError,
    fetchUsers,
    fetchedUser,
    fetchedUserLoading,
    fetchedUserError,
    fetchUserById,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    actionLoading,
    actionError,
  };
}
