import axiosInterceptorInstance from 'axiosInterceptorInstance';
import { Product } from 'components/Product/Models/ProductInterface';
import { GetHomePageProductsApi } from 'lib/constants/EndPoints';

export const getHomePageProducts = () => {
  return axiosInterceptorInstance.get<Product[]>(GetHomePageProductsApi);
};
