import { User } from './user';
import { MediaGroup } from './media';

export interface Post {
    id: number,
    title: string;
    slug: string;
    is_adult_content: boolean;
    is_nsfl_content: boolean;
    is_free: boolean;
    has_copyright: boolean;
    user: User;
    media?: MediaGroup[];
}
