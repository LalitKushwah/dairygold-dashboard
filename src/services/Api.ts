import axios, { AxiosError, AxiosInstance } from 'axios';
import { message } from 'antd';
import { NavigateFunction } from 'react-router-dom';
const BASE_URL = 'https://order.tradekings.app:4001/dg/testing/api/';
let navigate: NavigateFunction | null = null;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export const Api = axios.create({
  baseURL: BASE_URL,
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      if (navigate) {
        navigate('/');
        message.error('Token missing please re-login to proceed');
      }
    }

    return config;
  },
  (error) => {
    if (navigate) {
      navigate('/');
    }
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ message: string }>) => {
    if (error.response && error.response.status === 401) {
      if (navigate) {
        navigate('/');
      }
      message.error('Token is expired/missing. Please login first.');
    }
    console.log(error);
    message.error(error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export const ApiWithoutToken: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

ApiWithoutToken.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiWithoutToken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (navigate) {
        navigate('/');
      }
      message.error('Token is expired/missing. Please login first.');
    }
    message.error(error.message);

    return Promise.reject(error);
  }
);
