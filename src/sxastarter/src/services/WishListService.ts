import axiosInterceptorInstance from 'axiosInterceptorInstance';
import { WishlistType } from 'components/account/Models/WishListType';
import * as EndPoints from 'lib/constants/EndPoints';

export const moveWishlistItemsToCart = (productId: any) => {
  return axiosInterceptorInstance.post(EndPoints.MoveWishlistItemsToCartApi, {
    WishListItemIds: [productId],
  });
};
export const deleteWishlistItems = (productId: any) => {
  return axiosInterceptorInstance.delete(EndPoints.DeleteWishlistItemsApi, {
    data: {
      WishListItemIds: [productId],
      PrepareWishlist: false,
    },
  });
};
export const getWishlist = () => {
  return axiosInterceptorInstance.get<WishlistType>(EndPoints.GetWishlistApi);
};
