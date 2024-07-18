export interface ShoppingCartType {
  OnePageCheckoutEnabled: boolean;
  ShowSku: boolean;
  ShowProductImages: boolean;
  IsEditable: boolean;
  Items: ProductItem[];
  CheckoutAttributes: CheckoutAttribute[];
  Warnings: string[];
  MinOrderSubtotalWarning: string;
  DisplayTaxShippingInfo: boolean;
  TermsOfServiceOnShoppingCartPage: boolean;
  TermsOfServiceOnOrderConfirmPage: boolean;
  TermsOfServicePopup: boolean;
  DiscountBox: DiscountBox;
  GiftCardBox: GiftCardBox;
  OrderReviewData: OrderReviewData;
  ButtonPaymentMethodViewComponents: string[];
  HideCheckoutButton: boolean;
  ShowVendorName: boolean;
  CustomProperties: object;
}

export interface ProductItem {
  Sku: string;
  VendorName: string;
  Picture: Picture;
  ProductId: number;
  ProductName: string;
  ProductSeName: string;
  UnitPrice: string;
  UnitPriceValue: number;
  SubTotal: string;
  SubTotalValue: number;
  Discount: string;
  DiscountValue: number;
  MaximumDiscountedQty: number;
  Quantity: number;
  AllowedQuantities: AllowedQuantity[];
  AttributeInfo: string;
  RecurringInfo: string;
  RentalInfo: string;
  AllowItemEditing: boolean;
  DisableRemoval: boolean;
  Warnings: string[];
  Id: number;
  CustomProperties: object;
}
export interface OrderTotalResponse {
  OrderTotals: OrderTotals;
  SelectedAttributes: string;
  EnabledAttributeIds: number[];
  DisabledAttributeIds: number[];
}
export interface GiftCardResponse {
  GiftCardBox: GiftCardBox;
  OrderTotals: OrderTotals;
}
export interface DiscountBoxResponse {
  DiscountBox: DiscountBox;
  OrderTotals: OrderTotals;
}
export interface OrderTotals {
  IsEditable: boolean;
  SubTotal: string;
  SubTotalDiscount: string;
  Shipping: string;
  RequiresShipping: boolean;
  SelectedShippingMethod: string;
  HideShippingTotal: boolean;
  PaymentMethodAdditionalFee: string;
  Tax: string;
  TaxRates: TaxRate[];
  DisplayTax: boolean;
  DisplayTaxRates: boolean;
  GiftCards: GiftCard[];
  OrderTotalDiscount: string;
  RedeemedRewardPoints: number;
  RedeemedRewardPointsAmount: string;
  WillEarnRewardPoints: number;
  OrderTotal: string;
  CustomProperties: object;
}
export interface GiftCard {
  Amount: string;
  CouponCode: string;
  CustomProperties: object;
  Id: number;
  Remaining: string;
}
export interface TaxRate {
  Rate: string;
  Value: string;
  CustomProperties: object;
}
export interface Picture {
  ImageUrl: string;
  ThumbImageUrl: string;
  FullSizeImageUrl: string;
  Title: string;
  AlternateText: string;
  CustomProperties: object;
}

export interface AllowedQuantity {
  Disabled: boolean;
  Group: Group;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface Group {
  Disabled: boolean;
  Name: string;
}

export interface CheckoutAttribute {
  Name: string;
  DefaultValue: string;
  TextPrompt: string;
  IsRequired: boolean;
  SelectedDay: number;
  SelectedMonth: number;
  SelectedYear: number;
  AllowedFileExtensions: string[];
  AttributeControlType: string;
  Values: Value[];
  Id: number;
  CustomProperties: object;
}

export interface Value {
  Name: string;
  ColorSquaresRgb: string;
  PriceAdjustment: string;
  IsPreSelected: boolean;
  Id: number;
  CustomProperties: object;
}

export interface DiscountBox {
  AppliedDiscountsWithCodes: AppliedDiscountsWithCode[];
  Display: boolean;
  Messages: string[];
  IsApplied: boolean;
  CustomProperties: object;
}

export interface AppliedDiscountsWithCode {
  CouponCode: string;
  Id: number;
  CustomProperties: object;
}

export interface UpdateCartRequest {
  CartItemId: number;
  Quantity: number;
}

export interface CartRemoveRequest {
  CartItemIds: number[];
  PrepareCart: true;
}

export interface GiftCardBox {
  Display: boolean;
  Message: string;
  IsApplied: boolean;
  CustomProperties: object;
}

export interface OrderReviewData {
  Display: boolean;
  BillingAddress: BillingAddress;
  IsShippable: boolean;
  ShippingAddress: ShippingAddress;
  SelectedPickupInStore: boolean;
  PickupAddress: PickupAddress;
  ShippingMethod: string;
  PaymentMethod: string;
  CustomValues: object;
  CustomProperties: object;
}

export interface BillingAddress {
  FirstName: string;
  LastName: string;
  Email: string;
  CompanyEnabled: boolean;
  CompanyRequired: boolean;
  Company: string;
  CountryEnabled: boolean;
  CountryId: number;
  CountryName: string;
  StateProvinceEnabled: boolean;
  StateProvinceId: number;
  StateProvinceName: string;
  CountyEnabled: boolean;
  CountyRequired: boolean;
  County: string;
  CityEnabled: boolean;
  CityRequired: boolean;
  City: string;
  StreetAddressEnabled: boolean;
  StreetAddressRequired: boolean;
  Address1: string;
  StreetAddress2Enabled: boolean;
  StreetAddress2Required: boolean;
  Address2: string;
  ZipPostalCodeEnabled: boolean;
  ZipPostalCodeRequired: boolean;
  ZipPostalCode: string;
  PhoneEnabled: boolean;
  PhoneRequired: boolean;
  PhoneNumber: string;
  FaxEnabled: boolean;
  FaxRequired: boolean;
  FaxNumber: string;
  AvailableCountries: AvailableCountry[];
  AvailableStates: AvailableState[];
  FormattedCustomAddressAttributes: string;
  CustomAddressAttributes: CustomAddressAttribute[];
  Id: number;
  CustomProperties: object;
}

export interface AvailableCountry {
  Disabled: boolean;
  Group: Group2;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface Group2 {
  Disabled: boolean;
  Name: string;
}

export interface AvailableState {
  Disabled: boolean;
  Group: Group3;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface Group3 {
  Disabled: boolean;
  Name: string;
}

export interface CustomAddressAttribute {
  ControlId: string;
  Name: string;
  IsRequired: boolean;
  DefaultValue: string;
  AttributeControlType: string;
  Values: Value2[];
  Id: number;
  CustomProperties: object;
}

export interface Value2 {
  Name: string;
  IsPreSelected: boolean;
  Id: number;
  CustomProperties: object;
}

export interface ShippingAddress {
  FirstName: string;
  LastName: string;
  Email: string;
  CompanyEnabled: boolean;
  CompanyRequired: boolean;
  Company: string;
  CountryEnabled: boolean;
  CountryId: number;
  CountryName: string;
  StateProvinceEnabled: boolean;
  StateProvinceId: number;
  StateProvinceName: string;
  CountyEnabled: boolean;
  CountyRequired: boolean;
  County: string;
  CityEnabled: boolean;
  CityRequired: boolean;
  City: string;
  StreetAddressEnabled: boolean;
  StreetAddressRequired: boolean;
  Address1: string;
  StreetAddress2Enabled: boolean;
  StreetAddress2Required: boolean;
  Address2: string;
  ZipPostalCodeEnabled: boolean;
  ZipPostalCodeRequired: boolean;
  ZipPostalCode: string;
  PhoneEnabled: boolean;
  PhoneRequired: boolean;
  PhoneNumber: string;
  FaxEnabled: boolean;
  FaxRequired: boolean;
  FaxNumber: string;
  AvailableCountries: AvailableCountry2[];
  AvailableStates: AvailableState2[];
  FormattedCustomAddressAttributes: string;
  CustomAddressAttributes: CustomAddressAttribute2[];
  Id: number;
  CustomProperties: object;
}

export interface AvailableCountry2 {
  Disabled: boolean;
  Group: Group4;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface Group4 {
  Disabled: boolean;
  Name: string;
}

export interface AvailableState2 {
  Disabled: boolean;
  Group: Group5;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface Group5 {
  Disabled: boolean;
  Name: string;
}

export interface CustomAddressAttribute2 {
  ControlId: string;
  Name: string;
  IsRequired: boolean;
  DefaultValue: string;
  AttributeControlType: string;
  Values: Value3[];
  Id: number;
  CustomProperties: object;
}

export interface Value3 {
  Name: string;
  IsPreSelected: boolean;
  Id: number;
  CustomProperties: object;
}

export interface PickupAddress {
  FirstName: string;
  LastName: string;
  Email: string;
  CompanyEnabled: boolean;
  CompanyRequired: boolean;
  Company: string;
  CountryEnabled: boolean;
  CountryId: number;
  CountryName: string;
  StateProvinceEnabled: boolean;
  StateProvinceId: number;
  StateProvinceName: string;
  CountyEnabled: boolean;
  CountyRequired: boolean;
  County: string;
  CityEnabled: boolean;
  CityRequired: boolean;
  City: string;
  StreetAddressEnabled: boolean;
  StreetAddressRequired: boolean;
  Address1: string;
  StreetAddress2Enabled: boolean;
  StreetAddress2Required: boolean;
  Address2: string;
  ZipPostalCodeEnabled: boolean;
  ZipPostalCodeRequired: boolean;
  ZipPostalCode: string;
  PhoneEnabled: boolean;
  PhoneRequired: boolean;
  PhoneNumber: string;
  FaxEnabled: boolean;
  FaxRequired: boolean;
  FaxNumber: string;
  AvailableCountries: AvailableCountry3[];
  AvailableStates: AvailableState3[];
  FormattedCustomAddressAttributes: string;
  CustomAddressAttributes: CustomAddressAttribute3[];
  Id: number;
  CustomProperties: object;
}

export interface AvailableCountry3 {
  Disabled: boolean;
  Group: Group6;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface Group6 {
  Disabled: boolean;
  Name: string;
}

export interface AvailableState3 {
  Disabled: boolean;
  Group: Group7;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface Group7 {
  Disabled: boolean;
  Name: string;
}

export interface CustomAddressAttribute3 {
  ControlId: string;
  Name: string;
  IsRequired: boolean;
  DefaultValue: string;
  AttributeControlType: string;
  Values: Value4[];
  Id: number;
  CustomProperties: object;
}

export interface Value4 {
  Name: string;
  IsPreSelected: boolean;
  Id: number;
  CustomProperties: object;
}
