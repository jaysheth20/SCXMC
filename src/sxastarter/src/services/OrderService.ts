import axiosInterceptorInstance from 'axiosInterceptorInstance';
import { OrderType } from 'components/Account/Models/OrderType';
import { OrderDetailType } from 'components/Account/Models/OrderDetailTypes';
import { FileUpdaloadResponse, ReturnOrderModel } from 'components/Account/Models/ReturnOrderTypes';
import * as EndPoints from 'lib/constants/EndPoints';

export const getOrderDetails = (search: any) => {
  const url: string = EndPoints.GetOrderDetailsApi + search;
  return axiosInterceptorInstance.get<OrderDetailType>(url);
};
export const printInvoice = (search: any) => {
  return axiosInterceptorInstance({
    method: 'GET',
    responseType: 'blob',
    url: EndPoints.PrintInvoiceApi + search,
  });
};
export const reOrder = (search: any) => {
  return axiosInterceptorInstance.post(EndPoints.ReOrderApi + search);
};
export const getCustomerOrders = () => {
  return axiosInterceptorInstance.get<OrderType>(EndPoints.GetCustomerOrdersApi);
};

export const getReturnRequest = (orderId: any) => {
  return axiosInterceptorInstance.get<ReturnOrderModel>(EndPoints.GetReturnRequestApi + orderId);
};
export const returnRequest = (orderId: any, values: any) => {
  return axiosInterceptorInstance.post(
    EndPoints.ReturnRequestApi + orderId,
    JSON.stringify(values)
  );
};
export const uploadFileReturnRequest = (returnRequest: any) => {
  return axiosInterceptorInstance.post<FileUpdaloadResponse>(
    EndPoints.UploadFileReturnRequestApi,
    returnRequest
  );
};
