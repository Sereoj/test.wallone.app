import type { Post, PostState } from "~/types/post";
import type { MediaGroup, MediaItem } from "~/types/media";

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
                const config = useRuntimeConfig();
                const response = await $fetch<Post>(`${config.public.apiBase}posts/${slug}`);
                logger('API response:', response);
                this.postData = response;

                const flatMedia = this.getFlatMedia(response.media);

                this.currentMedia = flatMedia[0] || {} as MediaItem;
            } catch (error: any) {
                console.error('Error fetching post:', error);
                this.error = error.data?.message || error.message || 'Произошла ошибка при загрузке данных';
            } finally {
                this.loading = false;
            }
        },

        setCurrentMedia(index: number) {
            const flatMedia = this.getFlatMedia(this.postData.media);
            if (flatMedia[index]) {
                this.currentMedia = flatMedia[index];
                logger('Changed current media to:', this.currentMedia);
            }
        },

        getFlatMedia(media?: any[]): MediaItem[] {
            if (!media || !Array.isArray(media)) {
                logger('Media is not an array or undefined');
                return [];
            }

            try {
                // Если медиа уже плоский массив
                if (media[0]?.type && media[0]?.src) {
                    logger('Media is already flat');
                    return media as MediaItem[];
                }

                // Если медиа сгруппированы
                if (media[0]?.group) {
                    return media.flatMap((group: MediaGroup) => group.group || []);
                }

                return [];
            } catch (error) {
                console.error('Error processing media:', error);
                return [];
            }
        },
    },
});
