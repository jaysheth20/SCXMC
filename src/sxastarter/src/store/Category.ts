import { createSlice } from '@reduxjs/toolkit';

import { RootCategory } from 'components/product/Models/CategoryType';
import { getCategory } from 'src/services/ProductService';

const TopMenuSlice = createSlice({
  name: 'topMenu',
  initialState: {
    Categories: <RootCategory>{},
    Loading: true,
    Error: '',
  },
  reducers: {
    fetchTopMenuStart(state) {
      state.Loading = true;
      state.Error = '';
    },
    fetchTopMenuSuccess(state, action) {
      state.Categories = action.payload;
      state.Loading = false;
    },
    fetchTopMenuFailure(state, action) {
      state.Loading = false;
      state.Error = action.payload;
    },
  },
});
export const { fetchTopMenuStart, fetchTopMenuSuccess, fetchTopMenuFailure } = TopMenuSlice.actions;
export default TopMenuSlice.reducer;

export const fetchTopMenuData = () => (dispatch: any, getState: any) => {
  const { data } = getState().topMenu;

  if (!data) {
    dispatch(fetchTopMenuStart());

    try {
      getCategory()
        .then((res) => {
          dispatch(fetchTopMenuSuccess(res.data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(fetchTopMenuFailure(err));
        });
    } catch (error: any) {
      dispatch(fetchTopMenuFailure(error.message));
    }
  }
};
