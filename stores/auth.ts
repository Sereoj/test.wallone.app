import type { ErrorType, RegisterResponse } from "~/types/auth";
import type { ShortUser } from "~/types/user";
import { useCookie } from "#app";
import {AUTH_TOKEN_KEY} from "~/constants/constants";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as ShortUser | null,
        token: null as string | null,
        error: null as ErrorType | null,
        isLoading: false,
    }),
    actions: {
        async register(username: string, email: string, password: string, password_confirmation: string, rememberMe: boolean) {
            try {
                const { $axios } = useNuxtApp();
                const response = await $axios.post<RegisterResponse>(`/register`, {
                    username,
                    email,
                    password,
                    password_confirmation,
                    remember_me: rememberMe,
                });

                if (response.data.user && response.data.token) {
                    this.token = response.data.token.access_token;
                    this.user = response.data.user;

                    const tokenCookie = useCookie(AUTH_TOKEN_KEY, {
                        maxAge: 60 * 60 * 24 * 7,
                        path: "/",
                        secure: process.env.NODE_ENV === "production",
                        httpOnly: true,
                    });
                    tokenCookie.value = this.token;

                    return true;
                }
                return false;
            } catch (error: any) {
                console.error(error);
                this.error = messageError(error);
                return false;
            }
        },

        async logout() {
            try {
                const { $axios } = useNuxtApp();
                await $axios.post('/logout');

                this.clearAuthState();
            } catch (error: any) {
                this.error = messageError(error);
                this.clearAuthState();
            }
        },

        initializeAuthState() {
            const tokenCookie = useCookie(AUTH_TOKEN_KEY);
            const storedToken = tokenCookie.value;

            if (storedToken) {
                this.token = storedToken;
                this.isLoading = true;

                this.fetchUserData()
                    .catch(() => {
                        this.clearAuthState();
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },

        async fetchUserData() {
            try {
                const { $axios } = useNuxtApp();
                const response = await $axios.get<ShortUser>('/user');
                this.user = response.data;
            } catch (error: any) {
                console.error(error);
                this.error = messageError(error);
                this.clearAuthState();
            }
        },

        clearAuthState() {
            this.token = null;
            this.user = null;

            // Удаляем токен из cookies
            const tokenCookie = useCookie(AUTH_TOKEN_KEY);
            tokenCookie.value = null;
        },
    },
    getters: {
        isLoggedIn(): boolean {
            return !!this.token;
        },
    },
});
