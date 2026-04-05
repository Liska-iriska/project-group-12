import axios from 'axios';
import { showLoader, hideLoader } from '../utils/loader';
import { showError } from '../utils/toast';

export const http = axios.create({
  baseURL: 'https://furniture-store-v2.b.goit.study/api',
});

let requestsCounter = 0;

http.interceptors.request.use(
  config => {
    requestsCounter += 1;
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
    requestsCounter -= 1;

    if (requestsCounter <= 0) {
      requestsCounter = 0;
      hideLoader();
    }

    return response;
  },
  error => {
    requestsCounter -= 1;

    if (requestsCounter <= 0) {
      requestsCounter = 0;
      hideLoader();
    }

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Не вдалося виконати запит';

    showError(message);

    return Promise.reject(error);
  }
);