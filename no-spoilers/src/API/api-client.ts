import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

const { get, post, patch, delete: destroy } = apiClient;

export const setAuthHeader = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { get, post, patch, destroy };
