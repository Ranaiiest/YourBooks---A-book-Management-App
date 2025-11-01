import axios from 'axios';

const API = axios.create({
  // point axios baseURL at the API prefix used by the backend
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Attach token to headers if available. Set both Authorization and x-auth-token
// so backend middleware can accept either form.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export default API;
