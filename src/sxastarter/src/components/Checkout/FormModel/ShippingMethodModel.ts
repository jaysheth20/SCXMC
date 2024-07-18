export interface ShippingMethodModel {
  ShippingMethods: ShippingMethod[];
  NotifyCustomerAboutShippingFromMultipleLocations: boolean;
  Warnings: any[];
  DisplayPickupInStore: boolean;
  PickupPointsModel: any;
}

export interface ShippingMethod {
  ShippingRateComputationMethodSystemName: string;
  Name: string;
  Description?: string;
  Fee: string;
  Rate: number;
  DisplayOrder: number;
  Selected: boolean;
  ShippingOption: string;
}
export interface ShippingMethodReq {
  ShippingMethodName: string;
  IsPickup: boolean;
  PickupPointName: string;
}
