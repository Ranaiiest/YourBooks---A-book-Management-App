import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

// print the api's baseURL to the console
console.log('API Base URL:', API.defaults.baseURL);

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export default API;
