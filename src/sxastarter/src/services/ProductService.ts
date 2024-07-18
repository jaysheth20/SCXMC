import axios from 'axios';

import * as setting from 'src/lib/setting';
import axiosInterceptorInstance from 'axiosInterceptorInstance';
import { RootCategory } from 'components/Product/Models/CategoryType';
import {
  ProductAttributeResponse,
  ProductDetailType,
} from 'components/Product/Models/ProductDetailType';
import { ProductListResponse } from 'components/Product/Models/ProductInterface';
import * as EndPoints from 'src/lib/constants/EndPoints';

export const getCategory = () => {
  return axiosInterceptorInstance.get<RootCategory>(EndPoints.GetTopMenuApi);
};

export const getCategoryProducts = (search: any) => {
  return axiosInterceptorInstance.get<ProductListResponse>(
    EndPoints.GetCategoryProductsApi + search
  );
};

export const getProductDetails = (search: any) => {
  return axiosInterceptorInstance.get<ProductDetailType>(
    EndPoints.GetProductDetailsApi + search + '?updatecartitemid=0'
  );
};
export const changeProductAttribute = (data: any, search: any) => {
  return axiosInterceptorInstance.post<ProductAttributeResponse>(
    EndPoints.ChangeProductAttributeApi + search,
    { Attributes: data }
  );
};

export const searchProduct = (data: any) => {
  const reqconfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    maxBodyLength: Infinity,
    data: data,
    url: setting.SecureHost + EndPoints.ProductSearchApi,
  };

  return axios.request(reqconfig);
};
