export interface RootCategory {
  Categories: Category[];
}
export interface Category {
  Name: string;
  Description: string;
  MetaKeywords: string;
  MetaDescription: string;
  MetaTitle: string;
  SeName: string;
  DisplayCategoryBreadcrumb: boolean;
  CategoryBreadcrumb: string[];
  SubCategories: SubCategory[];
  Id: number;
}
export interface SubCategory {
  Name: string;
  SeName: string;
  Description: string;
  Id: number;
}
