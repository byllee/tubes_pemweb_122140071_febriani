import React from 'react';
import '../styles/FlowerCard.css'; 

const FlowerCard = ({ flower }) => {
  return (
    <div className="flower-card">
      <div className="image-wrapper">
        <img src={flower.imageUrl} alt={flower.name} className="flower-image" />
      </div>
      <div className="flower-content">
        <h3 className="flower-title">{flower.name}</h3>
        <p className="flower-description">{flower.description}</p>
        <p className="flower-price">Rp {flower.price.toLocaleString()}</p>
        <button className="flower-button">Tambahkan ke keranjang</button>
      </div>
    </div>
  );
};

export default FlowerCard;
