import axios from 'axios';
import { showLoader, hideLoader } from '../utils/loader.js';
import { showError } from '../utils/toast.js';

export const http = axios.create({
  baseURL: 'https://furniture-store-v2.b.goit.study/api',
});

let requestsCounter = 0;

http.interceptors.request.use(
  config => {
    requestsCounter++;
    showLoader();
    return config;
  },
  error => {
    hideLoader();
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    if (--requestsCounter <= 0) hideLoader();
    return response;
  },
  error => {
    if (--requestsCounter <= 0) hideLoader();
    const message = error?.response?.data?.message || 'Помилка запиту';
    showError(message);
    return Promise.reject(error);
  }
);
