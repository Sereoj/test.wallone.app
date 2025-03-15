export default defineNuxtRouteMiddleware((to, from) => {
    const { isLoggedIn } = storeToRefs(useAuthStore());

    if (isLoggedIn.value && ['login', 'register', 'forgot-password'].includes(to.name as string)) {
        return navigateTo('/');
    }
});
