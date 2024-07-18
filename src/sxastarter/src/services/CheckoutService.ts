import * as EndPoints from 'lib/constants/EndPoints';
import axiosInterceptorInstance from 'axiosInterceptorInstance';
import { AddressList, EditAddressList } from 'components/Checkout/FormModel/BillingAddress';
import { ShippingAddressList, StorePickup } from 'components/Checkout/FormModel/ShippingAddress';
import { Country, States } from 'components/Checkout/FormModel/Country';
import { ShippingMethodModel } from 'components/Checkout/FormModel/ShippingMethodModel';
import { PaymentInformation } from 'components/Checkout/FormModel/PaymentInformation';
import { PaymentMethodModel } from 'components/Checkout/FormModel/PaymentMethodModel';
import { ShoppingCartType } from 'components/Cart/Models/ShoppingCartType';

export const getAddresses = () => {
  return axiosInterceptorInstance.get<AddressList>(EndPoints.GetAddressesApi);
};

export const selectBillingAdderss = (selectedAddress: any, shipToSameAddress: any) => {
  const url: string =
    EndPoints.SelectBillingAddressApi + selectedAddress + '?shipToSameAddress=' + shipToSameAddress;
  return axiosInterceptorInstance.get(url);
};

export const getAddressById = (selectedAddress: any) => {
  return axiosInterceptorInstance.get<EditAddressList>(EndPoints.GetAddressApi + selectedAddress);
};

export const deleteAddress = (selectedAddress: any) => {
  return axiosInterceptorInstance.delete(EndPoints.DeleteAddressApi + selectedAddress);
};
export const getShippingAddress = () => {
  return axiosInterceptorInstance.get<ShippingAddressList>(EndPoints.GetShippingAddressesApi);
};
export const getPickupPoints = () => {
  return axiosInterceptorInstance.get<StorePickup>(EndPoints.GetPickupPointsApi);
};

export const selectShippingMethod = (req: any) => {
  return axiosInterceptorInstance.post(EndPoints.SelectShippingMethodApi, req);
};

export const selectShippingAddress = (selectedAddress: any) => {
  return axiosInterceptorInstance.get(EndPoints.SelectShippingAddressApi + selectedAddress);
};

export const updateAddress = (values: any) => {
  return axiosInterceptorInstance.put(EndPoints.UpdateAddressApi + values.Id, values);
};

export const addBillingAddress = (values: any) => {
  return axiosInterceptorInstance.post(EndPoints.AddBillingAddressApi, values);
};

export const getCountries = () => {
  return axiosInterceptorInstance.get<Country[]>(EndPoints.GetCountriesApi);
};

export const getStates = (countryId: any) => {
  return axiosInterceptorInstance.get<States[]>(EndPoints.GetStatesApi + countryId);
};
export const addShippingAddress = (values: any) => {
  return axiosInterceptorInstance.post(EndPoints.AddShippingAddressApi, values);
};

export const getShippingMethods = () => {
  return axiosInterceptorInstance.get<ShippingMethodModel>(EndPoints.GetShippingMethodsApi);
};

export const getPaymentInfo = () => {
  return axiosInterceptorInstance.get<PaymentInformation>(EndPoints.GetPaymentInfoApi);
};

export const validatePaymentInfo = (PaymentInfo: any) => {
  return axiosInterceptorInstance.post(EndPoints.ValidatePaymentInfoApi, PaymentInfo);
};
export const getPickupMethods = () => {
  return axiosInterceptorInstance.get<PaymentMethodModel>(EndPoints.GetPaymentMethodsApi);
};

export const selectPaymentMethod = (selectedMethod: any) => {
  return axiosInterceptorInstance.get(EndPoints.SelectPaymentMethodApi + selectedMethod);
};

export const getOrderSummary = () => {
  return axiosInterceptorInstance.get<ShoppingCartType>(EndPoints.GetOrderSummaryApi);
};

export const confirmOrder = (PaymentInfo: any) => {
  return axiosInterceptorInstance.post(EndPoints.ConfirmOrderApi, PaymentInfo);
};
