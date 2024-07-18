export interface ShippingAddress {
  Id: number;
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
}
export interface ShippingAddressList {
  Addresses: ShippingAddress[];
}

export interface StorePickup {
  Warnings: string[];
  PickupPoints: PickupPoint[];
  AllowPickupInStore: boolean;
  PickupInStore: boolean;
  PickupInStoreOnly: boolean;
  DisplayPickupPointsOnMap: boolean;
  GoogleMapsApiKey: string;
}

export interface PickupPoint {
  Id: string;
  Name: string;
  Description: string;
  ProviderSystemName: string;
  Address: string;
  City: string;
  County: string;
  StateName: string;
  CountryName: string;
  ZipPostalCode: string;
  Latitude: number;
  Longitude: number;
  PickupFee: string;
  OpeningHours: string;
}
