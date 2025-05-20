import React, { useContext } from 'react';
import '../styles/Favorites.css';
import { StoreContext } from '../context/StoreContext'; 

const Favorites = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { favorites } = state;

  const removeFromFavorites = (id) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id });
  };

  return (
    <div className="favorites">
      <h2>Favorite</h2>
      {favorites.length === 0 ? (
        <p>Tidak ada item favorit.</p>
      ) : (
        <ul>
          {favorites.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => removeFromFavorites(item.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
