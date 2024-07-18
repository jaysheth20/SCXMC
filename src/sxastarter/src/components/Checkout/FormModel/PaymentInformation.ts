export interface PaymentInformation {
  DescriptionText: string;
  PaymentMethodName: string;
  PaymentMethodType: string;
  Type: string;
  Title: string;
  Status: number;
  Detail: string;
  Instance: string;
  CreditCardTypes: CartTypes[];
}
export interface CartTypes {
  Text: string;
  Value: string;
}
export interface CardDetail {
  CreditCardType: string;
  CardholderName: string;
  CardNumber: string;
  ExpireMonth: string;
  ExpireYear: string;
  CardCode: string;
}
