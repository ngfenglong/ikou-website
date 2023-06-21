import axios from 'axios';

export const getPlaceById = async (id: string ) => {
    const response = await axios.get(`${process.env.REACT_APP_IKOU_API_BASEURL}/places/getPlaceById/${id}`);
    return response.data;
  };