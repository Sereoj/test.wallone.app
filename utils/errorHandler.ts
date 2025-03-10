import type { ErrorResponse } from '~/types/auth';

export const messageError = (error: any): string => {
    if (error.response && error.response.data) {
        const errorData = error.response.data as ErrorResponse;

        if (errorData.errors) {
            const errorMessages = Object.values(errorData.errors).flat();
            return errorMessages.join('; ') || 'An unexpected error occurred';
        } else if (errorData.message) {
            return errorData.message;
        }
    }

    if (error.request && !error.response) {
        return 'Network error or server is unavailable';
    }

    return 'An unexpected error occurred';
};
