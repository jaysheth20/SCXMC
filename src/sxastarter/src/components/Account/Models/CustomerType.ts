export type Customer = {
  IsImpersonationAllowed: true;
  Customer: CustomerDetails;
  CustomerId: number;
  AccessToken: string;
  RefreshToken: string;
};
export type CustomerDetails = {
  CustomerGuid: string;
  Username: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: Date;
  Company: string;
  StreetAddress: string;
  StreetAddress2: string;
  ZipPostalCode: string;
  City: string;
  County: string;
  CountryId: number;
  StateProvinceId: number;
  Phone: string;
  Fax: string;
  VatNumber: string;
  VatNumberStatusId: number;
  TimeZoneId: string;
  CustomCustomerAttributesXML: string;
  CurrencyId: number;
  LanguageId: number;
  TaxDisplayTypeId: number;
  EmailToRevalidate: string;
  AdminComment: string;
  IsTaxExempt: true;
  AffiliateId: number;
  VendorId: number;
  HasShoppingCartItems: true;
  RequireReLogin: true;
  FailedLoginAttempts: number;
  CannotLoginUntilDateUtc: Date;
  Active: true;
  Deleted: true;
  IsSystemAccount: true;
  SystemName: string;
  LastIpAddress: string;
  CreatedOnUtc: Date;
  LastLoginDateUtc: Date;
  LastActivityDateUtc: Date;
  RegisteredInStoreId: number;
  BillingAddressId: number;
  ShippingAddressId: number;
  VatNumberStatus: string;
  TaxDisplayType: string;
  Id: number;
};
