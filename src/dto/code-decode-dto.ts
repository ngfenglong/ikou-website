export interface CodeDecodeSubCategoryDto {
  id: string;
  code: number;
  decode: string;
  is_active: boolean;
}

export interface CodeDecodeCategoryDto {
  id: string;
  code: number;
  decode: string;
  is_active: boolean;
  sub_categories: CodeDecodeSubCategoryDto[];
}
