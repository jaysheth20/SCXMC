export interface Country {
  Name: string;
  AllowsBilling: boolean;
  AllowsShipping: boolean;
  TwoLetterIsoCode: string;
  ThreeLetterIsoCode: string;
  NumericIsoCode: number;
  SubjectToVat: boolean;
  Published: boolean;
  DisplayOrder: number;
  LimitedToStores: boolean;
  Id: number;
}
export interface States {
  id: number;
  name: string;
  Abbreviation: string;
  Published: boolean;
  DisplayOrder: number;
}
