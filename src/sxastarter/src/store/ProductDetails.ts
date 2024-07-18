import { createSlice } from '@reduxjs/toolkit';

import { ProductDetailType } from 'components/product/Models/ProductDetailType';

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    productItems: <ProductDetailType[]>[],
    Loading: true,
    Error: '',
  },
  reducers: {
    putProductDetails(state, action) {
      state.productItems.push(action.payload);
      state.Loading = false;
    },
  },
});
export const { putProductDetails } = productDetailSlice.actions;
export default productDetailSlice;
