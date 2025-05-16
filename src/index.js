import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext'; // Ganti sesuai kebutuhan jika pakai Redux

import './index.css'; // Opsional: file CSS global

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider> {/* Jika menggunakan Context API */}
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
