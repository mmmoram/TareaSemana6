import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 10000, 
});

apiClient.interceptors.request.use((config) => {
  console.log(`[Petición API]: ${config.url}`);
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);