import axios, { AxiosInstance } from 'axios';
import type { NuxtApp } from '@nuxt/types';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
    const api: AxiosInstance = axios.create({
        baseURL: 'http://test',
        timeout: 10000,
    });

    nuxtApp.provide('axios', api);
});
