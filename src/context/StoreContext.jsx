import React, { createContext, useContext, useReducer } from 'react';

export const StoreContext = createContext();

const initialState = {
  cart: [],
  favorites: [],
  orders: [],
  products: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.payload] };

    case 'REMOVE_FROM_FAVORITES':
      return { ...state, favorites: state.favorites.filter(item => item.id !== action.payload) };

    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [], // clear cart after order
      };

    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const addToFavorites = (item) => dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  const removeFromFavorites = (id) => dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id });

  const placeOrder = (order) => dispatch({ type: 'PLACE_ORDER', payload: order });

  return (
    <StoreContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      clearCart,
      addToFavorites,
      removeFromFavorites,
      placeOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
