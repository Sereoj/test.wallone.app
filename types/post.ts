import { MediaItem } from '~/types/media';
import type {Settings} from "~/types/settings";
import type {Statistics} from "~/types/statistics";
import type {App} from "~/types/app";
import type {Tag} from "~/types/tag";
import type {ShortUser} from "~/types/user";

export interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
    page: number;
    perPage: number;
    hasMore: boolean;
}

export interface PostState {
    postData: Partial<Post>;
    loading: boolean;
    error: string | null;
    currentMedia: Partial<MediaItem>;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    settings: Settings;
    media: MediaItem[];
    user: ShortUser;
    statistics: Statistics;
    apps: App[];
    tags: Tag[];
    created_at: string;
    updated_at: string;
}
