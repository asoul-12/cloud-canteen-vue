import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { redirectToWelcome } from 'utils/useRouterJump';
import { ErrorData } from '@/types/common/errorData';

const service = axios.create({
  baseURL: '/v2',
  timeout: 100000,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    put: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    delete: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  },
  transformRequest: [data => JSON.stringify(data)],
  transformResponse: [
    data =>
      typeof data === 'string' && data.startsWith('{')
        ? JSON.parse(data)
        : data,
  ],
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default service;
