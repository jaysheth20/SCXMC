import { createSlice } from '@reduxjs/toolkit';

import { ShoppingCartType } from 'components/cart/Models/ShoppingCartType';
import { getCart } from 'src/services/ShoppingCartService';

const shoppingcartSlice = createSlice({
  name: 'shoppingcart',
  initialState: {
    cart: <ShoppingCartType>{},
    Loading: true,
    Error: '',
  },
  reducers: {
    fetchDataStart(state) {
      state.Loading = true;
      state.Error = '';
    },
    fetchDataSuccess(state, action) {
      state.cart = action.payload;
      state.Loading = false;
    },
    fetchDataFailure(state, action) {
      state.Loading = false;
      state.Error = action.payload;
    },
    updateCart(state, action) {
      const updatedCart = { ...state.cart };
      updatedCart.Items = updatedCart.Items.map((item) => {
        if (item.Id === action.payload.item.Id) {
          return { ...item, Quantity: parseInt(action.payload.quantity) };
        }
        return item;
      });

      state.cart = updatedCart;
    },
  },
});
export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, updateCart } =
  shoppingcartSlice.actions;
export default shoppingcartSlice;

export const fetchShoppingData = () => (dispatch: any) => {
  dispatch(fetchDataStart());
  try {
    getCart()
      .then((res) => {
        dispatch(fetchDataSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchDataFailure(err));
      });
  } catch (error: any) {
    dispatch(fetchDataFailure(error.message));
  }
};
