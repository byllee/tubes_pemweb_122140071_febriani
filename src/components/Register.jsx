import React, { useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!name || !email || !password) {
      alert('Semua kolom wajib diisi!');
      return;
    }

    // Simulasi proses registrasi
    console.log('Register:', { name, email, password });

    // Redirect ke halaman awal setelah berhasil daftar
    alert('Registrasi berhasil!');
    navigate('/');
  };

  return (
    <div className="register-container">
      <div className="register">
        <h2>Daftar Akun</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
          <button type="submit">Daftar</button>
        </form>
        <button className="back-button" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    </div>
  );
};

export default Register;
