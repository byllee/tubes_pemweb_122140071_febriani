import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === 'admin') {
      if (email === 'admin@petalora.com' && password === 'admin123') {
        alert('Login Admin berhasil!');
        navigate('/admin-dashboard');
      } else {
        alert('Email atau password admin salah!');
      }
    } else if (role === 'user') {
      if (email && password) {
        alert('Login User berhasil!');
        navigate('/');
      } else {
        alert('Email atau password user salah!');
      }
    }
  };

  return (
    <div className="login-container">
      {!role ? (
        <div className="role-selection">
          <h2>Pilih Peran</h2>
          <button onClick={() => setRole('user')}>Masuk sebagai User</button>
          <button onClick={() => setRole('admin')}>Masuk sebagai Admin</button>
        </div>
      ) : (
        <div className="login">
          <h2>Login {role === 'admin' ? 'Admin' : 'User'}</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">Masuk</button>
          </form>

          {role === 'user' && (
            <p className="register-link">
              Belum punya akun? <Link to="/register">Daftar di sini</Link>
            </p>
          )}

          <button className="back-button" onClick={() => setRole(null)}>Kembali</button>
        </div>
      )}
    </div>
  );
};

export default Login;
