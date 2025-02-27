import {customFetch} from "~/utils/api";

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [] as Post[],
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
                const { data, error } = await customFetch<Post[]>('/public/api/posts', {
                    query: { per_page: this.perPage, page: this.page },
                });

                console.log('Fetched posts:', data);

                if (error) {
                    Logger.error('Error fetching posts:', error);
                    throw new Error(error.message || 'Failed to fetch posts');
                }

                if (data && data.length > 0) {
                    this.posts.push(...data.map((post) => ({
                        ...post,
                        media: post.media || [],
                    })));
                    this.page++;
                } else {
                    this.hasMore = false;
                }
            } catch (err: any) {
                Logger.error(err.value);
                this.error = err.message || 'An unknown error occurred';
            } finally {
                this.loading = false;
            }
        },
    },
});
