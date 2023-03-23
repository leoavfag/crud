import { AxiosError } from 'axios';

export const errorinterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Error de conexão'));
  }
  if (error.response?.status === 401) {
    return Promise.reject(new Error('Error de conexão'));
  }
  return Promise.reject(error);
};
