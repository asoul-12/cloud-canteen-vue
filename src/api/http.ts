import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { redirectToWelcome } from 'utils/useRouterJump';
import { ErrorData } from '@/types/common/errorData';

const service = axios.create({
  baseURL: '/v1',
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
    if (config.url === '/api/test') {
      return config;
    } else {
      const token = localStorage.getItem('token');
      token && (config.headers.Authorization = token);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const errorHandler = (status: number, nativeMessage: string): ErrorData => {
  let msg = 'axios err';

  switch (status) {
    case 401:
      msg = 'Incorrect username and password';
      break;
    case 403:
      msg = 'Expired tokens';
      break;
    case 404:
      msg = 'Resource does not exist';
      break;
  }

  return {
    status,
    msg,
    nativeMessage,
  };
};

// TODO
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;

    if (data.code === 1) {
      return Promise.resolve(data);
    } else if (data.code === 403) {
      redirectToWelcome();
      localStorage.clear();
      return Promise.reject(data);
    } else {
      return Promise.reject(data);
    }
  },
  (error: AxiosError) => {
    let errorData;
    console.log(error);
    if (error.response) {
      const { status, statusText } = error.response;
      errorData = errorHandler(status, statusText);
    }
    return Promise.reject(errorData);
  }
);

export default service;
