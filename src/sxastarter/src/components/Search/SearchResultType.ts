export interface SearchResults {
  q: string;
  ItemSearchResults: ItemSearchResult[];
  Menufacturers: Manufacturer[];
  Categories: Category[];
  SortSettings: SortSetting[];
  DisplayRecordsPerPages: DisplayRecordsPerPage[];
  PriceFilters: PriceFilters;
  PageNumber: number;
  PageSize: number;
  TotalResults: number;
  CategoryFacet: { [key: string]: number };
  MenufacturerFacet: { [key: string]: number };
  SelctedCategories: string;
  SelectedMenufacturer: string;
}

export interface ItemSearchResult {
  ProductId: string;
  ProductName: string;
  ItemId: string;
  IsAttribute: boolean;
  Price: string;
  ShortDescription: string;
  ImageUrl: string;
}

export interface Manufacturer {
  ManufacturerId: number;
  ManufacturerName: string;
}

export interface Category {
  CategoryId: number;
  CategoryName: string;
  CategoryDisplayName: string;
  DisplayOrder: number;
}

export interface PriceFilters {
  MinimumPrice: number;
  MaximumPrice: number;
}

export interface SortSetting {
  Id: number;
  Name: string;
}

export interface DisplayRecordsPerPage {
  Records: number;
}

export interface GlobalSearchRequest {
  SearchText: string;
  PageNumber: number;
  PageSize: number;
  Category: string;
  Manufacturer: string;
  SearchInDescription: boolean;
  MinPrice: number;
  MaxPrice: number;
  Sort: SortScenario;
  FacetCategories: string;
  FacetManufacturers: string;
}

export enum SortScenario {
  NameAscending = 1,
  NameDescending,
  PriceAscending,
  PriceDescending,
  CreatedOn,
}
