export interface Comment {
    id: number;
    user_id: number;
    post_id: number;
    content: string;
    parent_id: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    replies: Comment[];
    likes: any[];
    reports: any[];
}
