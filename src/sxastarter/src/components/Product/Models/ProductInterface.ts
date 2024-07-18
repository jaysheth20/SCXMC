export type Product = {
  Name: string;
  ShortDescription: string;
  FullDescription: string;
  SeName: string;
  Sku: string;
  ProductType: string;
  MarkAsNew: true;
  ProductPrice: ProductPrice;
  PictureModels: PictureModels[];
  ProductSpecificationModel: ProductSpecificationModel;
  ReviewOverviewModel: ReviewOverviewModel;
  Id: number;
  CustomProperties: object;
};
export type ProductPrice = {
  OldPrice: string;
  OldPriceValue: number;
  Price: string;
  PriceValue: number;
  BasePricePAngV: string;
  BasePricePAngVValue: number;
  DisableBuyButton: boolean;
  DisableWishlistButton: boolean;
  DisableAddToCompareListButton: boolean;
  AvailableForPreOrder: boolean;
  PreOrderAvailabilityStartDateTimeUtc: Date;
  IsRental: boolean;
  ForceRedirectionAfterAddingToCart: boolean;
  DisplayTaxShippingInfo: boolean;
  CustomProperties: object;
};
export type PictureModels = {
  ImageUrl: string;
  ThumbImageUrl: string;
  FullSizeImageUrl: string;
  Title: string;
  AlternateText: string;
  CustomProperties: object;
};

export type ReviewOverviewModel = {
  ProductId: number;
  RatingSum: number;
  TotalReviews: number;
  AllowCustomerReviews: true;
  CanAddNewReview: true;
  CustomProperties: object;
};

export type ProductSpecificationModel = {
  Groups: SpecificationGroupModel[];
  CustomProperties: object;
};
export type SpecificationGroupModel = {
  Name: string;
  Attributes: SpecificationAttributesModel[];
  Id: 0;
  CustomProperties: object;
};
export type SpecificationAttributesModel = {
  Name: string;
  Values: SpecificationAttributesValuesModel[];
  Id: 0;
  CustomProperties: object;
};
export type SpecificationAttributesValuesModel = {
  AttributeTypeId: number;
  ValueRaw: string;
  ColorSquaresRgb: string;
  CustomProperties: object;
};

export interface ProductListResponse {
  Products: Product[];
}
