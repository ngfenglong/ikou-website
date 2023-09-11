import { CodeDecodeCategoryDto } from '../dto/code-decode-dto';
import { CodeDecodeCategory } from '../model/code-decode';

export const mapCodeDecodeCategoryDtoToModel = (
  codeDecodeCateogriesDto: CodeDecodeCategoryDto[]
): CodeDecodeCategory[] => {
  if (!codeDecodeCateogriesDto) return [];

  const result = codeDecodeCateogriesDto.map(
    (categoryDto) =>
      ({
        id: categoryDto.id,
        code: categoryDto.code,
        decode: categoryDto.decode,
        subCategories:
          categoryDto.sub_categories?.map((subCategoryDto) => ({
            id: subCategoryDto.id,
            code: subCategoryDto.code,
            decode: subCategoryDto.decode,
          })) ?? [],
      } as CodeDecodeCategory)
  );
  return result;
};
