import {AUTH_TOKEN_KEY} from "~/constants/constants";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    if (authStore.isLoggedIn) {
        if (to.path === '/login' || to.path === '/register') {
            return navigateTo('/');
        }
    } else {
        const tokenCookie = useCookie(AUTH_TOKEN_KEY);
        const storedToken = tokenCookie.value;

        if (!storedToken) {
            if (to.path === '/login' || to.path === '/register') {
                return;
            }
            return navigateTo('/login');
        }
        authStore.token = storedToken;

        try {
            await authStore.fetchUserData();
        } catch (error: any) {
            await authStore.logout();
            return navigateTo('/login');
        }
    }
});
