import https from 'https';

import axios from 'axios';
import Cookies from 'js-cookie';

import * as Settings from 'src/lib/setting';

const axiosInterceptorInstance = axios.create({
  baseURL: Settings.CommerceBaseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-API-KEY': Settings.ApiKey,
  },
});

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('.Nop.Authentication');
    const NopCustomerId = Cookies.get('NopCustomerId');
    if (!config.headers['authorization']) {
      if (config.headers && accessToken) {
        config.headers['authorization'] = `Bearer ${accessToken}`;
        config.headers['.Nop.Customer'] = NopCustomerId;
      }
    }

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    config.httpsAgent = agent;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
