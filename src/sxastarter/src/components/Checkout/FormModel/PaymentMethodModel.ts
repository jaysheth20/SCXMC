export interface PaymentMethodModel {
  PaymentMethods: PaymentMethod[];
  DisplayRewardPoints: boolean;
  RewardPointsBalance: number;
  RewardPointsToUse: number;
  RewardPointsToUseAmount: string;
  RewardPointsEnoughToPayForOrder: boolean;
  UseRewardPoints: boolean;
}

export interface PaymentMethod {
  PaymentMethodSystemName: string;
  Name: string;
  Description: string;
  Fee: string;
  Selected: boolean;
  LogoUrl: string;
}
