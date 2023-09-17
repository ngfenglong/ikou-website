import { mapCodeDecodeCategoryDtoToModel } from "../model-mapper/code-decode-mapper";
import { CodeDecodeArea, CodeDecodeCategory } from "../model/code-decode";
import api from "./middleware/api-config";

export const getCategories = async (): Promise<CodeDecodeCategory[]> => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/common/codeDecodeCategories`,
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return mapCodeDecodeCategoryDtoToModel(response.data);
  } catch (error) {
    throw error;
  }
};

export const getAreas = async (): Promise<CodeDecodeArea[]> => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/common/codeDecodeAreas`,
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
