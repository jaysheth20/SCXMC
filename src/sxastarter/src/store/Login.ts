import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';

import { CustomerDetails } from 'components/Account/Models/CustomerType';

const Loginslice = createSlice({
  name: 'login',
  initialState: {
    LoggedIn: Cookies.get('.Nop.Authentication') ? true : false || false,
    Customer: <CustomerDetails>{},
  },
  reducers: {
    UserLogin: (state) => {
      state.LoggedIn = true;
    },
    UserLogout: (state) => {
      Cookies.remove('.Nop.Authentication');
      Cookies.remove('NopCustomerId');
      Cookies.remove('SC_ANALYTICS_GLOBAL_COOKIE', { path: '/' });
      state.LoggedIn = false;
    },
    fetchDataCustomer(state, action) {
      state.Customer = action.payload;
    },
  },
});

export default Loginslice;

export const { UserLogin, UserLogout, fetchDataCustomer } = Loginslice.actions;
