import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-books-a-book-management-app-9j.vercel.app/api',
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
