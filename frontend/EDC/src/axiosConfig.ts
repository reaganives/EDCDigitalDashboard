import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Create an instance of axios with default settings
const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api', // Base URL for all requests
    timeout: 5000, // Timeout after 5 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor if you need to attach tokens or other configurations
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // You can modify the request config here, such as adding authorization tokens
        const token = localStorage.getItem('token'); // Example: Get token from local storage
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Handle the error here if the request fails
        return Promise.reject(error);
    }
);

export default api;

