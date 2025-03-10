import type {ShortUser} from "~/types/user";

export interface TokenResponse {
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_at: string;
}

export interface RegisterResponse {
    user: ShortUser;
    token: TokenResponse;
}

export interface ErrorResponse {
    errors?: Record<string, string[]>;
    message?: string;
}

export type ErrorType = ErrorResponse | string;
