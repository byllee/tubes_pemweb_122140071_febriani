import React, { useContext } from 'react';
import '../styles/FlowerCard.css'; 
import { StoreContext } from '../context/StoreContext';

const FlowerCard = ({ flower }) => {
  const { state, dispatch } = useContext(StoreContext);

  const isFavorited = state.favorites.some(item => item.id === flower.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: flower });
  };

  const handleToggleFavorite = () => {
    if (isFavorited) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: flower.id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: flower });
    }
  };

  return (
    <div className="flower-card">
      <div className="image-wrapper">
        <img src={flower.imageUrl} alt={flower.name} className="flower-image" />
      </div>
      <div className="flower-content">
        <h3 className="flower-title">{flower.name}</h3>
        <p className="flower-description">{flower.description}</p>
        <p className="flower-price">Rp {flower.price.toLocaleString()}</p>
        
        <div className="flower-actions">
          <button className="flower-button" onClick={handleAddToCart}>
            Tambahkan ke Keranjang
          </button>
          <button 
            className={`favorite-button ${isFavorited ? 'favorited' : ''}`} 
            onClick={handleToggleFavorite}
          >
            {isFavorited ? '❤️ Favorit' : '🤍 Tambah Favorit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowerCard;
