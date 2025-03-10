import type {ShortUser} from "~/types/user";

export interface Comment {
    id: number;
    user: ShortUser;
    content: string;
    likes: Like[];
    reports: any[];
    reposts: number;
    replies: Comment[];
    created_at: string;
}

export interface Like {
    id: number;
    user_id: number;
    type: string;
}

export interface CommentResponse {
    comments: Comment[];
    meta: {
        totalPages: number;
        currentPage: number;
        totalItems: number;
    };
}

export interface CommentsState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    page: number;
    perPage: number;
    hasMore: boolean;
    totalPages: number;
    totalItems: number;
}
