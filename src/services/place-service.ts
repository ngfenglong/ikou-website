import { HTTP_STATUS } from '../constants/http-statuses';
import { PlaceRequestDto } from '../dto/place-dto';
import api from './middleware/api-config';

export const getAllPlaces = async () => {
  try {
    const response = await api.get('/places');

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlaceById = async (id: string) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/places/getPlaceById/${id}`
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlacesByCategory = async (category: string) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/places/getPlacesByCategory/${category}`
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlacesKeyword = async (searchKeyword: string) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    keyword: searchKeyword,
  };

  try {
    const response = await api.post(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/places/searchPlaceByKeyword`,
      body,
      options
    );
    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewPlaceRequest = async (placeRequest: PlaceRequestDto) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await api.post(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/places/addPlaceRequest`,
      placeRequest,
      options
    );
    if (response.status !== HTTP_STATUS.CREATED) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleLike = async (placeID: string) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_IKOU_API_BASEURL}/places/${placeID}/toggle-like`
    );
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
