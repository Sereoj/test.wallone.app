import { defineStore } from 'pinia';
import type { Post, PostsState } from "~/types/post";

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
        async fetchPosts() {
            if (this.loading || !this.hasMore) return;

            this.loading = true;
            this.error = null;

            try {
                const config = useRuntimeConfig();
                const response = await $fetch<Post[]>("/api/posts", {
                    query: {
                        per_page: this.perPage,
                        page: this.page,
                    },
                });

                logger('Fetched posts:', response);

                if (response && response.length > 0) {
                    this.posts.push(
                        ...response.map((post) => ({
                            ...post,
                            media: post.media || [],
                        }))
                    );
                    this.page++;
                } else {
                    this.hasMore = false;
                }
            } catch (error: any) {
                const errorMessage = error.data?.message || error.message || 'Failed to fetch posts';
                console.error('Error fetching posts:', errorMessage);
                this.error = errorMessage;
            } finally {
                this.loading = false;
            }
        },
    },
});
