import axios, { AxiosInstance } from 'axios';

const baseURL: string = process.env.REACT_APP_IKOU_API_BASEURL || '';

// 1. Create a new Axios instance
const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Set a timeout limit
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Adjust according to where you store the JWT token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
