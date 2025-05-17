import React from 'react';

const ProductDetail = () => {
    // Dummy data for product details
    const product = {
        id: 1,
        name: 'Paket Mawar Merah',
        price: 150000,
        description: 'Paket bunga mawar merah segar untuk berbagai acara.',
    };
    
    return (
        <div className="product-detail">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Harga: Rp {product.price.toLocaleString()}</p>
        <button>Tambah Keranjang</button>
        </div>
    );
}

export default ProductDetail;
