import { createSlice } from '@reduxjs/toolkit';

import { WishlistItem } from 'components/Account/Models/WishListType';
import { getWishlist } from 'src/services/WishListService';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: <WishlistItem[]>[],
    Loading: true,
    Error: '',
  },
  reducers: {
    fetchWishlistStart(state) {
      state.Loading = true;
      state.Error = '';
    },
    fetchWishlistSuccess(state, action) {
      state.wishlistItems = action.payload;
      state.Loading = false;
    },
    fetchWishlistFailure(state, action) {
      state.Loading = false;
      state.Error = action.payload;
    },
  },
});
export const { fetchWishlistStart, fetchWishlistSuccess, fetchWishlistFailure } =
  wishlistSlice.actions;
export default wishlistSlice;

export const fetchWishlistData = () => (dispatch: any, getState: any) => {
  const { data } = getState().wishlist;

  if (!data) {
    dispatch(fetchWishlistStart());

    try {
      getWishlist()
        .then((res) => {
          dispatch(fetchWishlistSuccess(res.data.Items));
        })
        .catch((err) => {
          console.log(err);
          dispatch(fetchWishlistFailure(err));
        });
    } catch (error: any) {
      dispatch(fetchWishlistFailure(error.message));
    }
  }
};
