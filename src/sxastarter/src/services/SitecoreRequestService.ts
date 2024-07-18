import axios from 'axios';

import { SecureHost } from 'src/lib/setting';

export const CreateSitecoreRequest = (url: any, data: any) => {
  const reqconfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    maxBodyLength: Infinity,
    data: data,
    url: SecureHost + url,
  };
  return axios.request(reqconfig);
};
