import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import Loginslice from './Login';
import shoppingcartSlice from './ShoppingCart';
import wishlistSlice from './Wishlist';
import productDetailSlice from './ProductDetails';
import TopMenuSlice from './Category';
import AttributeSlice from './CheckoutAttribute';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, Loginslice.reducer);
const store = configureStore({
  reducer: {
    login: persistedReducer,
    shoppingcart: shoppingcartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    productDetails: productDetailSlice.reducer,
    topMenu: TopMenuSlice,
    checkoutattribute: AttributeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
