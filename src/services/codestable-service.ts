import api from './middleware/api-config';

export const getCategories = async () => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/common/codeDecodeCategories`
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
