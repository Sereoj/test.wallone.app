import { defineStore } from 'pinia';
import axios, { AxiosInstance, AxiosError } from 'axios';
import type {Post, PostsState} from "~/types/post";

export const usePostsStore = defineStore('posts', {
    state: (): PostsState => ({
        posts: [],
        loading: false,
        error: null,
        page: 1,
        perPage: 40,
        hasMore: true,
    }),
    actions: {
        async fetchPosts(this: PostsState & { $axios?: AxiosInstance }) {
            if (this.loading || !this.hasMore) return;

            this.loading = true;
            this.error = null;

            // Получаем Axios из Nuxt через useNuxtApp (предполагается, что он зарегистрирован в плагине)
            const { $axios } = useNuxtApp<{
                $axios: AxiosInstance;
            }>();

            try {
                const response = await $axios.get<Post[]>('/public/api/posts', {
                    params: {
                        per_page: this.perPage,
                        page: this.page,
                    },
                });

                console.log('Fetched posts:', response.data);

                if (response.data && response.data.length > 0) {
                    this.posts.push(
                        ...response.data.map((post) => ({
                            ...post,
                            media: post.media || [],
                        }))
                    );
                    this.page++;
                } else {
                    this.hasMore = false;
                }
            } catch (err: unknown) {
                // Обработка ошибок с типизацией для Axios
                const error = err as AxiosError<{ message?: string }>;
                const errorMessage =
                    error.response?.data?.message || error.message || 'Failed to fetch posts';
                console.error('Error fetching posts:', errorMessage); // Заменяем Logger на console.error
                this.error = errorMessage;
            } finally {
                this.loading = false;
            }
        },
    },
});
