import { createSlice } from '@reduxjs/toolkit';
const AttributeSlice = createSlice({
  name: 'checkoutattribute',
  initialState: {
    attribute: {},
  },
  reducers: {
    Attribute(state, action) {
      state.attribute = action.payload;
    },
  },
});

export default AttributeSlice;

export const { Attribute } = AttributeSlice.actions;
