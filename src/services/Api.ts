import axios, { AxiosInstance } from 'axios';
import { message } from 'antd';
import { NavigateFunction } from 'react-router-dom';

const BASE_URL = process.env.API_URL;
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
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
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

    return Promise.reject(error);
  }
);

export const ApiWithoutToken: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

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

    return Promise.reject(error);
  }
);
