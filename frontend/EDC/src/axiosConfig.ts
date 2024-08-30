import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Create an instance of axios with default settings
const api: AxiosInstance = axios.create({
    baseURL: 'api.edc.reaganives.io/api', // Include http:// or https://
    timeout: 5000, // Timeout after 5 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach tokens or modify the request
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
        // Ensure headers are always defined
        config.headers = config.headers || {};

        // Example: Attach an authorization token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle the error here if the request fails
        return Promise.reject(error);
    }
);

export default api;


