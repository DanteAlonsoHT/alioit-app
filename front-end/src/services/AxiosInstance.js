import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
    baseURL: `http://localhost:8008/api/`,
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.auth.authToken;
    config.params = config.params || {};
    config.headers['Authorization'] = `Token ${token}`;
    console.log(config);
    return config;
});

export default axiosInstance;
