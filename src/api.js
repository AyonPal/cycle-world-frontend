import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    config.validateStatus = function (status) {
        return status < 500;
      };
    return config;
  },
  error => Promise.reject(error)
);

export default API;
