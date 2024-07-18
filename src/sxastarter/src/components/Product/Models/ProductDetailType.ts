export interface ProductDetailType {
  ProductCategories: ProductCategory[];
  DefaultPictureZoomEnabled: boolean;
  DefaultPictureModel: DefaultPictureModel;
  PictureModels: PictureModel[];
  VideoModels: any[];
  Name: string;
  ShortDescription: string;
  FullDescription: string;
  MetaKeywords: any;
  MetaDescription: string;
  MetaTitle: any;
  SeName: string;
  VisibleIndividually: boolean;
  ProductType: string;
  ShowSku: boolean;
  Sku: string;
  ShowManufacturerPartNumber: boolean;
  ManufacturerPartNumber: any;
  ShowGtin: boolean;
  Gtin: any;
  ShowVendor: boolean;
  VendorModel: VendorModel;
  HasSampleDownload: boolean;
  GiftCard: GiftCard;
  IsShipEnabled: boolean;
  IsFreeShipping: boolean;
  FreeShippingNotificationEnabled: boolean;
  DeliveryDate: any;
  IsRental: boolean;
  RentalStartDate: any;
  RentalEndDate: any;
  AvailableEndDate: any;
  ManageInventoryMethod: string;
  StockAvailability: string;
  DisplayBackInStockSubscription: boolean;
  EmailAFriendEnabled: boolean;
  CompareProductsEnabled: boolean;
  PageShareCode: string;
  ProductPrice: ProductPrice;
  AddToCart: AddToCart;
  Breadcrumb: Breadcrumb;
  ProductTags: ProductTag[];
  ProductAttributes: ProductAttribute[];
  ProductSpecificationModel: ProductSpecificationModel;
  ProductManufacturers: any[];
  ProductReviewOverview: ProductReviewOverview;
  ProductEstimateShipping: ProductEstimateShipping;
  TierPrices: any[];
  AssociatedProducts: any[];
  DisplayDiscontinuedMessage: boolean;
  CurrentStoreName: string;
  InStock: boolean;
  AllowAddingOnlyExistingAttributeCombinations: boolean;
  Id: number;
  CustomProperties: object;
}

export interface ProductCategory {
  ProductId: number;
  CategoryId: number;
  IsFeaturedProduct: boolean;
  DisplayOrder: number;
  Id: number;
}

export interface DefaultPictureModel {
  ImageUrl: string;
  ThumbImageUrl: any;
  FullSizeImageUrl: string;
  Title: string;
  AlternateText: string;
  CustomProperties: object;
}

export interface PictureModel {
  ImageUrl: string;
  ThumbImageUrl: string;
  FullSizeImageUrl: string;
  Title: string;
  AlternateText: string;
  CustomProperties: object;
}

export interface VendorModel {
  Name: any;
  SeName: any;
  Id: number;
  CustomProperties: object;
}

export interface GiftCard {
  IsGiftCard: boolean;
  RecipientName: any;
  RecipientEmail: any;
  SenderName: any;
  SenderEmail: any;
  Message: any;
  GiftCardType: string;
}

export interface ProductPrice {
  CurrencyCode: string;
  OldPrice: any;
  OldPriceValue: any;
  Price: string;
  PriceValue: number;
  PriceWithDiscount: any;
  PriceWithDiscountValue: any;
  CustomerEntersPrice: boolean;
  CallForPrice: boolean;
  ProductId: number;
  HidePrices: boolean;
  IsRental: boolean;
  RentalPrice: any;
  RentalPriceValue: any;
  DisplayTaxShippingInfo: boolean;
  BasePricePAngV: any;
  BasePricePAngVValue: number;
  CustomProperties: object;
}

export interface AddToCart {
  ProductId: number;
  EnteredQuantity: number;
  MinimumQuantityNotification: any;
  AllowedQuantities: any[];
  CustomerEntersPrice: boolean;
  CustomerEnteredPrice: number;
  CustomerEnteredPriceRange: any;
  DisableBuyButton: boolean;
  DisableWishlistButton: boolean;
  IsRental: boolean;
  AvailableForPreOrder: boolean;
  PreOrderAvailabilityStartDateTimeUtc: any;
  PreOrderAvailabilityStartDateTimeUserTime: any;
  UpdatedShoppingCartItemId: number;
  UpdateShoppingCartItemType: any;
  CustomProperties: object;
}

export interface Breadcrumb {
  Enabled: boolean;
  ProductId: number;
  ProductName: string;
  ProductSeName: string;
  CategoryBreadcrumb: CategoryBreadcrumb[];
  CustomProperties: object;
}

export interface CategoryBreadcrumb {
  Name: string;
  SeName: string;
  NumberOfProducts: any;
  IncludeInTopMenu: boolean;
  SubCategories: any[];
  HaveSubCategories: boolean;
  Route: any;
  Id: number;
  CustomProperties: object;
}

export interface ProductTag {
  Name: string;
  SeName: string;
  ProductCount: number;
  Id: number;
  CustomProperties: object;
}

export interface ProductAttribute {
  ProductId: number;
  ProductAttributeId: number;
  Name: string;
  Description: any;
  TextPrompt: any;
  IsRequired: boolean;
  DefaultValue: any;
  SelectedDay: any;
  SelectedMonth: any;
  SelectedYear: any;
  HasCondition: boolean;
  AllowedFileExtensions: any[];
  AttributeControlType: string;
  Values: Value[];
  Id: number;
  CustomProperties: object;
}

export interface Value {
  Name: string;
  ColorSquaresRgb: any;
  ImageSquaresPictureModel: ImageSquaresPictureModel;
  PriceAdjustment?: string;
  PriceAdjustmentUsePercentage: boolean;
  PriceAdjustmentValue: number;
  IsPreSelected: boolean;
  PictureId: number;
  CustomerEntersQty: boolean;
  Quantity: number;
  Id: number;
  CustomProperties: object;
}

export interface ImageSquaresPictureModel {
  ImageUrl: any;
  ThumbImageUrl: any;
  FullSizeImageUrl: any;
  Title: any;
  AlternateText: any;
  CustomProperties: object;
}

export interface ProductSpecificationModel {
  Groups: Group[];
  CustomProperties: object;
}

export interface Group {
  Name: any;
  Attributes: any[];
  Id: number;
  CustomProperties: object;
}

export interface ProductReviewOverview {
  ProductId: number;
  RatingSum: number;
  TotalReviews: number;
  AllowCustomerReviews: boolean;
  CanAddNewReview: boolean;
  CustomProperties: object;
}

export interface ProductEstimateShipping {
  ProductId: number;
  RequestDelay: number;
  Enabled: boolean;
  CountryId: any;
  StateProvinceId: any;
  ZipPostalCode: any;
  UseCity: boolean;
  City: any;
  AvailableCountries: AvailableCountry[];
  AvailableStates: AvailableState[];
  CustomProperties: object;
}

export interface AvailableCountry {
  Disabled: boolean;
  Group: any;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface AvailableState {
  Disabled: boolean;
  Group: any;
  Selected: boolean;
  Text: string;
  Value: string;
}
export interface ProductAttributeResponse {
  ProductId: number;
  Gtin: string;
  Mpn: string;
  Sku: string;
  Price: string;
  Basepricepangv: string;
  StockAvailability: string;
  Enabledattributemappingids: number[];
  Disabledattributemappingids: number[];
  PictureFullSizeUrl: string;
  PictureDefaultSizeUrl: string;
  IsFreeShipping: boolean;
  Message: string[];
}

export interface AddToCartReq {
  Quantity: number;
  Attributes: object;
}
