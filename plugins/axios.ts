import axios from 'axios';
import type { AxiosInstance } from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();

    const api: AxiosInstance = axios.create({
        baseURL: 'http://test/public/api',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    api.interceptors.request.use((config) => {
        const token = authStore.token;
        if (token) {
            console.log('Добавлен токен:', token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.request.use((config) => {
        console.log('Request:', config);
        return config;
    });

    api.interceptors.response.use(
        (response) => {
            console.log('Response:', response);
            return response;
        },
        (error) => {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', api);
});
