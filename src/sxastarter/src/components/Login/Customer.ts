export interface LoginResponse {
  IsImpersonationAllowed: boolean;
  Customer: Customer;
  CustomerId: number;
  AccessToken: string;
  RefreshToken: string;
}

export interface Customer {
  CustomerGuid: string;
  Username: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: string;
  Company: string;
  StreetAddress: any;
  StreetAddress2: any;
  ZipPostalCode: any;
  City: any;
  County: any;
  CountryId: number;
  StateProvinceId: number;
  Phone: any;
  Fax: any;
  VatNumber: any;
  VatNumberStatusId: number;
  TimeZoneId: any;
  CustomCustomerAttributesXML: string;
  CurrencyId: any;
  LanguageId: any;
  TaxDisplayTypeId: any;
  EmailToRevalidate: any;
  AdminComment: any;
  IsTaxExempt: boolean;
  AffiliateId: number;
  VendorId: number;
  HasShoppingCartItems: boolean;
  RequireReLogin: boolean;
  FailedLoginAttempts: number;
  CannotLoginUntilDateUtc: any;
  Active: boolean;
  Deleted: boolean;
  IsSystemAccount: boolean;
  SystemName: any;
  LastIpAddress: any;
  CreatedOnUtc: string;
  LastLoginDateUtc: string;
  LastActivityDateUtc: string;
  RegisteredInStoreId: number;
  BillingAddressId: any;
  ShippingAddressId: any;
  VatNumberStatus: string;
  TaxDisplayType: any;
  Id: number;
}
