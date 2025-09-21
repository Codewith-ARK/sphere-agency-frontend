import axios from 'axios';
import useUserStore from '@/store/userStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api-url.com';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach Authorization header for every request if token exists
axiosClient.interceptors.request.use(
  (config) => {
    // Zustand store is not directly accessible outside React, so we use a getter function
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
