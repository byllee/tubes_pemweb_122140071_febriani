import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hook/useProduct';
import { useCart } from '../context/StoreContext';  // sesuaikan path
import '../styles/ProdukDetail.css';

const ProductDetail = () => {
  const { id } = useParams();

  const {
    selectedProduct,
    selectedLoading,
    selectedError,
    fetchProductById,
  } = useProduct();

  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  if (selectedLoading) return <p>Loading...</p>;
  if (selectedError) return <p>{selectedError}</p>;
  if (!selectedProduct) return <p>Produk tidak ditemukan.</p>;

  const product = selectedProduct.product || selectedProduct;

  const handleAddToCart = () => {

    const orderId = 1;

    addToCart({
      order_id: orderId,
      product_id: product.id || product.product_id,
      nama: product.nama || product.name,
      harga: product.harga || product.price,
      quantity: 1,
      stok: product.stok || 0,
      gambar: product.image_url || product.gambar || 'https://i.imgur.com/fq6VRTg.jpeg',
    });

    alert(`Produk ${product.nama || product.name} berhasil ditambahkan ke keranjang.`);
  };

  return (
    <div className="product-detail">
      <h2>{product.nama || product.name}</h2>
      <img
        src={product.image_url || product.gambar || 'https://i.imgur.com/fq6VRTg.jpeg'}
        alt={product.nama || product.name}
        style={{ maxWidth: '300px', marginBottom: '1rem' }}
      />
      <p>Harga: Rp {product.harga?.toLocaleString() || product.price?.toLocaleString()}</p>
      <p>{product.deskripsi || product.description}</p>
      <button onClick={handleAddToCart}>Tambah ke Keranjang</button>
    </div>
  );
};

export default ProductDetail;
