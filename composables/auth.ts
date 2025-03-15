import { defineStore } from "pinia";
import type { AuthResponse, ErrorType, MessageResponse } from "~/types/auth";
import type { ShortUser } from "~/types/user";
import { AUTH_TOKEN_KEY } from "~/constants/constants";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null as ShortUser | null,
        token: null as string | null,
        error: null as ErrorType | null,
        isLoading: false,
    }),
    actions: {
        async register(username: string, email: string, password: string, password_confirmation: string, rememberMe: boolean) {
            try {
                const config = useRuntimeConfig();
                const response = await $fetch<AuthResponse>(`${config.public.apiBase}register`, {
                    method: "POST",
                    body: { username, email, password, password_confirmation, remember_me: rememberMe },
                });
                return this.handleAuthResponse(response);
            } catch (error: any) {
                console.error("Ошибка регистрации:", error);
                this.error = error.message;
                return false;
            }
        },

        async login(email: string, password: string, rememberMe: boolean) {
            try {
                const config = useRuntimeConfig();
                const response = await $fetch<AuthResponse>(`${config.public.apiBase}login`, {
                    method: "POST",
                    body: { email, password, remember_me: rememberMe },
                });
                return this.handleAuthResponse(response);
            } catch (error: any) {
                console.error("Ошибка входа:", error);
                this.error = error.message;
                return false;
            }
        },

        async resetEmail(email: string) {
            try {
                const config = useRuntimeConfig();
                const response = await $fetch<MessageResponse>(`${config.public.apiBase}password/reset/email`, {
                    method: "POST",
                    body: { email },
                });
                return response.message;
            } catch (error: any) {
                console.error("Ошибка отправки email для сброса пароля:", error);
                this.error = error.message;
                return false;
            }
        },

        async passwordReset(token: string, email: string, newPassword: string, newPasswordConfirmation: string) {
            try {
                const config = useRuntimeConfig();
                const response = await $fetch<MessageResponse>(`${config.public.apiBase}password/reset`, {
                    method: "POST",
                    body: { token, email, password: newPassword, password_confirmation: newPasswordConfirmation },
                });
                return response.message;
            } catch (error: any) {
                console.error("Ошибка сброса пароля:", error);
                this.error = error.message;
                return false;
            }
        },

        async logout() {
            try {
                const config = useRuntimeConfig();
                await $fetch(`${config.public.apiBase}logout`, { method: "POST" });

                // Удаляем токен из куки
                const tokenCookie = useCookie(AUTH_TOKEN_KEY);
                tokenCookie.value = null;

                this.user = null;
                this.token = null;
            } catch (error: any) {
                console.error("Ошибка выхода:", error);
            }
        },

        async initializeAuthState() {
            const tokenCookie = useCookie(AUTH_TOKEN_KEY);
            const storedToken = tokenCookie.value;

            if (storedToken) {
                this.token = storedToken;
                this.isLoading = true;
                try {
                    await this.fetchUser();
                } catch (error: any) {
                    console.error("Ошибка получения пользователя:", error);
                    this.error = error.message;
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        this.clear();
                    }
                } finally {
                    this.isLoading = false;
                }
            }
        },

        async fetchUser() {
            try {
                const config = useRuntimeConfig();
                this.user = await $fetch<ShortUser>(`${config.public.apiBase}user`);
            } catch (error) {
                console.error("Ошибка загрузки пользователя:", error);
                this.user = null;
            }
        },

        handleAuthResponse(response: AuthResponse) {
            const tokenCookie = useCookie(AUTH_TOKEN_KEY);
            tokenCookie.value = response.token.access_token;

            this.token = response.token.access_token;
            this.user = response.user;

            return true;
        },

        clear() {
            const tokenCookie = useCookie(AUTH_TOKEN_KEY);
            tokenCookie.value = null;
            this.token = null;
            this.user = null;
        },
    },
    getters: {
        isLoggedIn(): boolean {
            return !!this.token;
        },
    },
});
