export const GetHomePageProductsApi = 'PublicProduct/GetHomePageProducts';
export const ChangePasswordApi = 'PublicCustomer/ChangePassword';
//Account
export const PasswordRecoveryApi = '/api/sitecore/Accounts/PasswordRecovery';
export const LoginApi = 'PublicCustomer/Login';
export const PasswordRecoveryConfirmApi = 'PublicCustomer/PasswordRecoveryConfirm';
export const PasswordRecoveryConfirmPOSTApi = 'PublicCustomer/PasswordRecoveryConfirmPOST';
export const RegisterApi = 'PublicCustomer/Register';
export const CreateIdentityUserApi = '/api/sitecore/Accounts/CreateIdentityUser';
export const LoginExtranetUserApi = '/api/sitecore/Accounts/LoginExtranetUser';
export const LogoutExtranetUserApi = '/api/sitecore/Accounts/LogoutExtranetUser';
export const ChangeExtranetUserPasswordApi = '/api/sitecore/Accounts/ChangeExtranetUserPassword';
//Product
export const GetTopMenuApi = 'PublicCategory/GetTopMenu';
export const GetCategoryProductsApi = 'PublicCategory/GetCategoryProducts/';
export const GetProductDetailsApi = 'PublicProduct/GetProductDetails/';
export const ChangeProductAttributeApi = 'PublicProduct/ChangeProductAttribute/';
export const ProductSearchApi = '/api/sitecore/Search/Search';

//Order
export const GetOrderDetailsApi = 'PublicOrder/GetOrderDetails/';
export const PrintInvoiceApi = 'PublicOrder/GetPdfInvoice/';
export const ReOrderApi = 'PublicOrder/ReOrder/';
export const GetCustomerOrdersApi = 'PublicOrder/GetCustomerOrders';
export const GetReturnRequestApi = 'PublicReturnRequest/GetReturnRequest/';
export const ReturnRequestApi = 'PublicReturnRequest/ReturnRequest/';
export const UploadFileReturnRequestApi = 'PublicReturnRequest/UploadFileReturnRequest';

//Wishlist
export const MoveWishlistItemsToCartApi = 'PublicShoppingCart/MoveWishlistItemsToCart';
export const DeleteWishlistItemsApi = 'PublicShoppingCart/DeleteWishlistItems';
export const GetWishlistApi = 'PublicShoppingCart/GetWishlist';

//Cart
export const AddToCartApi = 'PublicShoppingCart/AddToCart/';
export const AddToWishlistApi = 'PublicShoppingCart/AddToWishlist/';
export const ApplyDiscountCouponApi = 'PublicShoppingCart/ApplyDiscountCoupon/';
export const RemoveDiscountCouponApi = 'PublicShoppingCart/RemoveDiscountCoupon/';
export const GetCartApi = 'PublicShoppingCart/GetCart';
export const ApplyGiftCardApi = 'PublicShoppingCart/ApplyGiftCard/';
export const RemoveGiftCardApi = 'PublicShoppingCart/RemoveGiftCardCode/';
export const ChangeCheckoutAttributeApi = 'PublicShoppingCart/ChangeCheckoutAttribute';
export const GetOrderTotalsApi = 'PublicShoppingCart/GetOrderTotals';
export const UpdateCartItemsQuantityApi = 'PublicShoppingCart/UpdateCartItemsQuantity';
export const GetSelectedCheckoutAttributesApi = 'PublicShoppingCart/GetSelectedCheckoutAttributes';
export const DeleteCartItemsApi = 'PublicShoppingCart/DeleteCartItems';

//Checkout
export const GetAddressesApi = 'PublicCustomer/GetAddresses';
export const SelectBillingAddressApi = 'PublicCheckout/SelectBillingAddress/';
export const GetAddressApi = 'PublicCustomer/GetAddress/';
export const DeleteAddressApi = 'PublicCustomer/DeleteAddress/';
export const GetShippingAddressesApi = 'PublicCheckout/GetShippingAddresses';
export const GetPickupPointsApi = 'PublicCheckout/GetPickupPoints';
export const SelectShippingMethodApi = 'PublicCheckout/SelectShippingMethod';
export const SelectShippingAddressApi = 'PublicCheckout/SelectShippingAddress/';
export const UpdateAddressApi = 'PublicCustomer/UpdateAddress/';
export const AddBillingAddressApi = 'PublicCheckout/AddBillingAddress';
export const GetCountriesApi = 'PublicCommon/GetCountries';
export const GetStatesApi = 'PublicCommon/GetStates/';
export const AddShippingAddressApi = 'PublicCheckout/AddShippingAddress';
export const GetShippingMethodsApi = 'PublicCheckout/GetShippingMethods';
export const GetPaymentInfoApi = 'PublicCheckout/GetPaymentInfo';
export const ValidatePaymentInfoApi = 'PublicCheckout/ValidatePaymentInfo';
export const GetPaymentMethodsApi = 'PublicCheckout/GetPaymentMethods';
export const SelectPaymentMethodApi = 'PublicCheckout/SelectPaymentMethod/';
export const GetOrderSummaryApi =
  'PublicCheckout/GetOrderSummary?validateCheckoutAttributes=false&prepareOrderReviewData=true';
export const ConfirmOrderApi = 'PublicCheckout/ConfirmOrder';
