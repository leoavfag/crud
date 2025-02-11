import axios from 'axios';
import { Environment } from '../../../environment';
import { errorinterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorinterceptor(error)
);

export { Api };
