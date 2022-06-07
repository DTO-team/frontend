import axios from 'axios';
import queryString from 'query-string';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HOST_API_KEY,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosInstance.interceptors.request.use(async (config) => config);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
/* axiosInstance.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
); */

export default axiosInstance;
