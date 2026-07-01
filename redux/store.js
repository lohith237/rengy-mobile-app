import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import favoritesReducer from './favoritesSlice';
import cartReducer from './cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
const rootReducer = combineReducers({
  product: productReducer,
   favorites: favoritesReducer,
   cart:cartReducer
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites','cart'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);