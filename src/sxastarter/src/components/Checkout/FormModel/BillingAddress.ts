export interface BillingAddress {
  ShipToSameAddress: boolean;
  VatNumber: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Company: string;
  CountryId: number;
  StateProvinceId: number;
  Country: string;
  City: string;
  Address1: string;
  Address2: string;
  ZipPostalCode: string;
  PhoneNumber: string;
  FaxNumber: string;
  Id: number | null;
}
export interface AddressList {
  Addresses: BillingAddress[];
}
export interface EditAddressList {
  Address: BillingAddress;
}
