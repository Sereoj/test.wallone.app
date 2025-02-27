export interface User {
    username: string;
    slug: string;
    verification: boolean;
    avatar: {
        path: string;
    };
}
