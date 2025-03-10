import type {Post, PostState} from "~/types/post";
import type {AxiosError, AxiosInstance} from "axios";
import type {MediaGroup, MediaItem} from "~/types/media";

export const usePostStore = defineStore('post', {
    state: (): PostState => ({
        postData: {} as Post,
        loading: false,
        error: null,
        currentMedia: {} as MediaItem,
    }),
    actions: {
        async fetchPost(slug: string) {
            this.loading = true;
            this.error = null;

            try {
                const { $axios } = useNuxtApp();
                const response = await $axios.get<Post>(`posts/${slug}`);
                console.log('API response:', response.data);
                this.postData = response.data;

                const flatMedia = this.getFlatMedia(response.data.media);

                if (flatMedia.length > 0) {
                    this.currentMedia = flatMedia[0];
                } else {
                    this.currentMedia = {} as MediaItem;
                }
            } catch (err: unknown) {
                console.error('Error fetching post:', err);
                const axiosError = err as AxiosError<{ message?: string }>;
                this.error = axiosError.message || 'Произошла ошибка при загрузке данных';
            } finally {
                this.loading = false;
            }
        },

        setCurrentMedia(index: number) {
            const flatMedia = this.getFlatMedia(this.postData.media);
            if (flatMedia[index]) {
                this.currentMedia = flatMedia[index];
                console.log('Changed current media to:', this.currentMedia);
            }
        },

        getFlatMedia(media?: any[]): MediaItem[] {
            if (!media || !Array.isArray(media)) {
                console.log('Media is not an array or undefined');
                return [];
            }

            try {
                if (media.length > 0 && 'type' in media[0] && 'src' in media[0]) {
                    console.log('Media is already flat');
                    return media as MediaItem[];
                }

                if (media.length > 0 && 'group' in media[0]) {
                    return media.flatMap(group => group.group || []);
                }

                return [];
            } catch (error) {
                return [];
            }
        },
    },
});
