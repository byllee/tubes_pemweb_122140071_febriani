import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProductProvider } from "./context/ProductContext"; 
import { CartProvider } from "./context/StoreContext";  // tambahkan ini

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>  {/* bungkus dengan CartProvider */}
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
