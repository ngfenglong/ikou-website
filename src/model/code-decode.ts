import { CodeDecodeOption } from './common';

export interface CodeDecodeSubCategory extends CodeDecodeOption {}

export interface CodeDecodeCategory extends CodeDecodeOption {
  subCategories: CodeDecodeSubCategory[];
}
