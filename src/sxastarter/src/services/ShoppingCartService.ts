import axiosInterceptorInstance from 'axiosInterceptorInstance';
import {
  CartRemoveRequest,
  DiscountBoxResponse,
  GiftCardResponse,
  OrderTotalResponse,
  OrderTotals,
  ShoppingCartType,
} from 'components/Cart/Models/ShoppingCartType';
import { AddToCartReq } from 'components/Product/Models/ProductDetailType';
import * as EndPoints from 'lib/constants/EndPoints';

export const applyDiscountCoupon = (DiscountCoupon: any) => {
  return axiosInterceptorInstance.post<DiscountBoxResponse>(
    EndPoints.ApplyDiscountCouponApi + DiscountCoupon + '?prepareOrderTotals=true'
  );
};

export const removeDiscountCoupon = (DiscountCoupon: any) => {
  return axiosInterceptorInstance.post<OrderTotals>(
    EndPoints.RemoveDiscountCouponApi + DiscountCoupon + '?prepareOrderTotals=true'
  );
};

export const getCart = () => {
  return axiosInterceptorInstance.get<ShoppingCartType>(EndPoints.GetCartApi);
};

export const addItemToCart = (data: AddToCartReq, search: any) => {
  return axiosInterceptorInstance.post<AddToCartReq, any>(EndPoints.AddToCartApi + search, data);
};
export const addToWishlist = (data: AddToCartReq, search: any) => {
  return axiosInterceptorInstance.post<AddToCartReq, any>(
    EndPoints.AddToWishlistApi + search,
    data
  );
};

export const appyGiftCard = (GiftCard: any) => {
  return axiosInterceptorInstance.post<GiftCardResponse>(
    EndPoints.ApplyGiftCardApi + GiftCard + '?prepareOrderTotals=true'
  );
};

export const removeGiftCard = (GiftCard: any) => {
  return axiosInterceptorInstance.post<GiftCardResponse>(
    EndPoints.RemoveGiftCardApi + GiftCard + '?prepareOrderTotals=true'
  );
};

export const changeCheckoutAttribute = (checkoutattribute: any) => {
  return axiosInterceptorInstance.post<OrderTotalResponse>(
    EndPoints.ChangeCheckoutAttributeApi,
    checkoutattribute.attribute
  );
};

export const getOrderTotals = () => {
  return axiosInterceptorInstance.get<OrderTotals>(EndPoints.GetOrderTotalsApi);
};

export const updateCartItemsQuantity = (updateReq: any) => {
  return axiosInterceptorInstance.put<ShoppingCartType>(
    EndPoints.UpdateCartItemsQuantityApi,
    updateReq
  );
};
export const getSelectedCheckoutAttributes = () => {
  return axiosInterceptorInstance.get<string>(EndPoints.GetSelectedCheckoutAttributesApi);
};

export const removeFromCart = (id: number) => {
  const idToRemove: number[] = [];
  idToRemove.push(id);
  const itemToRemove: CartRemoveRequest = { PrepareCart: true, CartItemIds: idToRemove };
  return axiosInterceptorInstance.delete(EndPoints.DeleteCartItemsApi, { data: itemToRemove });
};
