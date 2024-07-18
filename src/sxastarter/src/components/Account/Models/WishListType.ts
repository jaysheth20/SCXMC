export interface WishlistType {
  CustomerGuid: string;
  CustomerFullname: string;
  EmailWishlistEnabled: boolean;
  ShowSku: boolean;
  ShowProductImages: boolean;
  IsEditable: boolean;
  DisplayAddToCart: boolean;
  DisplayTaxShippingInfo: boolean;
  Items: WishlistItem[];
  Warnings: string[];
  CustomProperties: object;
}

export interface WishlistItem {
  Sku: string;
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
  Warnings: string[];
  Id: number;
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
