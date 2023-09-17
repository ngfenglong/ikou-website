import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { HTTP_STATUS } from "../../constants/http-statuses";
import { History } from "../../utils/navigate-helper";

type FailedQueue = Array<{
  requestConfig: AxiosRequestConfig;
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}>;

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const baseURL: string = process.env.REACT_APP_IKOU_API_BASEURL || "";

const getToken = () => localStorage.getItem("access_token");
const setToken = (token: string) => localStorage.setItem("access_token", token);

// 1. Create a new Axios instance
const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Set a timeout limit
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// // 3. Response Interceptor
// Response interceptor
let isRefreshing = false;
let failedQueue: FailedQueue = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (prom.requestConfig.headers) {
        prom.requestConfig.headers["Authorization"] = "Bearer " + token;
      } else {
        prom.requestConfig.headers = { Authorization: "Bearer " + token };
      }
      api(prom.requestConfig).then(prom.resolve).catch(prom.reject);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response) {
        // For 502:Bad Gateway, 503: Service Unavilable, 504: Gateway Timeout
        const retryStatusCodes = [502, 503, 504];

        if (
          retryStatusCodes.includes(error.response.status) &&
          !error.config.__isRetryRequest
        ) {
          error.config.__isRetryRequest = true;
          return api.request(error.config);
        } else if (error.response.status === 401 && !error.config._retry) {
          return handle401Error(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

const handle401Error = (error: AxiosError) => {
  const originalRequest = error.config as CustomAxiosRequestConfig;

  if (!originalRequest) {
    // Handle or log the error appropriately
    console.error("Axios config is undefined", error);
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return new Promise<AxiosError>((resolve, reject) => {
      failedQueue.push({ requestConfig: originalRequest, resolve, reject });
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  const refreshToken = localStorage.getItem("refresh_token");
  return api
    .post("/auth/refresh-token", { refreshToken })
    .then(({ data }) => {
      setToken(data.access_token);
      api.defaults.headers["Authorization"] = "Bearer " + data.access_token;
      if (originalRequest.headers)
        originalRequest.headers["Authorization"] =
          "Bearer " + data.access_token;
      else
        originalRequest.headers = {
          Authorization: "Bearer " + data.access_token,
        };
      processQueue(null);
      return api(originalRequest);
    })
    .catch((err: AxiosError) => {
      processQueue(err);
      if (err.response && err.response.status === HTTP_STATUS.BAD_REQUEST) {
        const errMessage = generateInvalidRefreshErrMessage(err);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        alert(errMessage);
        History.navigate!("/login");
      }
      return Promise.reject(err);
    })
    .finally(() => {
      isRefreshing = false;
    });
};

const generateInvalidRefreshErrMessage = (err: AxiosError): string => {
  let errMessage = "An unexpected error occurred, please login again.";
  if (err.response && (err.response.data as { message: string })?.message) {
    errMessage = (err.response.data as { message: string })?.message;
    errMessage = `${errMessage
      .substring(0, 1)
      .toUpperCase()}${errMessage.substring(1)}.`;
  }

  return errMessage;
};

export default api;
