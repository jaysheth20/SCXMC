import {
  PickupAddress,
  ProductItem,
  BillingAddress,
  ShippingAddress,
  GiftCard,
} from 'components/cart/Models/ShoppingCartType';

export interface OrderDetailType {
  PrintMode: boolean;
  PdfInvoiceDisabled: boolean;
  CustomOrderNumber: string;
  CreatedOn: string;
  OrderStatus: string;
  IsReOrderAllowed: boolean;
  IsReturnRequestAllowed: boolean;
  IsShippable: boolean;
  PickupInStore: boolean;
  PickupAddress: PickupAddress;
  ShippingStatus: string;
  ShippingAddress: ShippingAddress;
  ShippingMethod: string;
  Shipments: Shipment[];
  BillingAddress: BillingAddress;
  VatNumber: string;
  PaymentMethod: string;
  PaymentMethodStatus: string;
  CanRePostProcessPayment: boolean;
  OrderSubtotal: string;
  OrderSubtotalValue: number;
  OrderSubTotalDiscount: string;
  OrderSubTotalDiscountValue: number;
  OrderShipping: string;
  OrderShippingValue: number;
  PaymentMethodAdditionalFee: string;
  PaymentMethodAdditionalFeeValue: number;
  CheckoutAttributeInfo: string;
  PricesIncludeTax: boolean;
  DisplayTaxShippingInfo: boolean;
  Tax: string;
  TaxRates: TaxRate[];
  DisplayTax: boolean;
  DisplayTaxRates: boolean;
  OrderTotalDiscount: string;
  OrderTotalDiscountValue: number;
  RedeemedRewardPoints: number;
  RedeemedRewardPointsAmount: string;
  OrderTotal: string;
  OrderTotalValue: number;
  GiftCards: GiftCard[];
  ShowSku: boolean;
  Items: ProductItem[];
  OrderNotes: OrderNote[];
  ShowVendorName: boolean;
  ShowProductThumbnail: boolean;
  Id: number;
}

export interface Shipment {
  TrackingNumber: string;
  ShippedDate: string;
  ReadyForPickupDate: string;
  DeliveryDate: string;
  Id: number;
  CustomProperties: object;
}

export interface TaxRate {
  Rate: string;
  Value: string;
  CustomProperties: object;
}

export interface OrderNote {
  HasDownload: boolean;
  Note: string;
  CreatedOn: string;
  Id: number;
  CustomProperties: object;
}
