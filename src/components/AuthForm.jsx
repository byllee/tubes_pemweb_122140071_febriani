import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import { useUser } from '../hook/UseUser';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { createUser, loginUser } = useUser();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, []);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('');
  };

  const handleLogin = async () => {
    if (!role) {
      alert('Pilih peran terlebih dahulu!');
      return false;
    }

    try {
      if (role === 'admin') {
        if (email === 'admin@petalora.com' && password === 'admin123') {
          localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
          alert('Login Admin berhasil!');
          navigate('/admin');
          return true;
        } else {
          alert('Email atau password admin salah!');
          return false;
        }
      }

      if (role === 'user') {
        const user = await loginUser(email, password, role);

        if (user?.role === 'user') {
          localStorage.setItem('user', JSON.stringify(user));
          alert('Login User berhasil!');
          navigate('/');
          return true;
        } else {
          alert('Role tidak sesuai atau akun tidak ditemukan.');
          return false;
        }
      }
    } catch (err) {
      console.error(err);
      alert('Gagal login. Periksa kembali email dan password.');
      return false;
    }
  };

  const handleRegister = async () => {
    if (role !== 'user') {
      alert('Hanya user yang dapat mendaftar.');
      return false;
    }

    if (!username || !email || !password) {
      alert('Semua kolom wajib diisi!');
      return false;
    }

    try {
      await createUser({ username, email, password, role });

      const loggedInUser = await loginUser(email, password, role);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      alert('Registrasi & login berhasil!');
      navigate('/');
      return true;
    } catch (err) {
      console.error(err);
      alert('Gagal registrasi user.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert('Pilih peran terlebih dahulu!');
      return;
    }

    setLoading(true);
    if (isLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Daftar Akun'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && role === 'user' && (
            <div className="form-row">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
          )}

          <div className="form-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <div className="form-row">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">Pilih Peran</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (isLogin ? 'Masuk...' : 'Daftar...') : isLogin ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        <button
          className="back-button"
          onClick={() => {
            setIsLogin(!isLogin);
            resetForm();
          }}
          disabled={loading}
        >
          {isLogin ? 'Belum punya akun? Daftar di sini' : 'Kembali ke Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
