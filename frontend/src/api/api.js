import axios from 'axios';

// Axios is a promise-based HTTP client for the browser and Node.js.
// it is a js library that simplifies making HTTP requests and handling responses.
// Axios is used to make HTTP requests to the backend API.
// here, we create an instance of axios with a base URL 
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});


console.log('API Base URL:', API.defaults.baseURL);



// here, we check the local storage for a token before each request is sent to the server.
// if a token is found, it is added to the request headers for authentication.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers['x-auth-token'] = token;
  }
  return req;
});


// exported to be used in other parts of the application to make API calls.
export default API;
