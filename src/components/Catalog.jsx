import React from "react";
import "../styles/Catalog.css";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../hook/useProduct";
import { useCart } from "../context/StoreContext";

const Catalog = () => {
  const { products, loading } = useProduct();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (loading) return <p>Loading produk...</p>;
  if (!products || products.length === 0) return <p>Produk tidak tersedia.</p>;

  const handleAddToCart = (product) => {
    const orderId = 1; // dummy order id, bisa dikembangkan ke dinamis

    addToCart({
      order_id: orderId,
      product_id: product.id || product.product_id,
      quantity: 1,
      harga: product.price || product.harga,
      nama: product.name || product.nama,
      stok: product.stok || 0,
    });

    // Setelah produk ditambahkan ke cart, langsung ke halaman checkout
    navigate('/checkout');
  };

  return (
    <div className="catalog-container">
      <h2>Katalog Produk</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image_url || "https://i.imgur.com/fq6VRTg.jpeg"}
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.src = "https://i.imgur.com/fq6VRTg.jpeg";
              }}
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">
              Rp {product.price?.toLocaleString("id-ID")}
            </p>

            <div className="button-group">
              <Link to={`/product/${product.id}`}>
                <button className="detail-button">Lihat Detail</button>
              </Link>

              <button
                className="order-button"
                onClick={() => handleAddToCart(product)}
              >
                Pesan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
