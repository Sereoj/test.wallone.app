import { defineStore } from "pinia";
import type { Comment, CommentsState, CommentResponse } from "~/types/comments";

export const useCommentsStore = defineStore('comments', {
    state: (): CommentsState => ({
        comments: [],
        loading: false,
        error: null,
        page: 1,
        perPage: 40,
        hasMore: true,
        totalPages: 0,
        totalItems: 0
    }),

    actions: {
        async fetchComments(postId: number, page: number = 1) {
            if (this.loading || (!this.hasMore && page > 1)) return;

            this.loading = true;
            this.error = null;

            try {
                const config = useRuntimeConfig();
                const response = await $fetch<CommentResponse>(`${config.public.apiBase}posts/${postId}/comments`, {
                    method: 'GET',
                    query: {
                        page,
                        per_page: this.perPage
                    }
                });

                logger('Fetched comments:', response);

                if (page === 1) {
                    this.comments = response.comments;
                } else {
                    this.comments.push(...response.comments);
                }

                this.totalPages = response.meta.totalPages;
                this.totalItems = response.meta.totalItems;
                this.page = page;
                this.hasMore = page < response.meta.totalPages;
            } catch (error: any) {
                const errorMessage = error.data?.message || error.message || 'Failed to fetch comments';
                console.error('Error fetching comments:', errorMessage);
                this.error = errorMessage;
            } finally {
                this.loading = false;
            }
        },

        async addComment(postId: number, content: string, parentId?: number) {
            this.loading = true;
            this.error = null;

            try {
                const payload: { content: string; parent_id?: number } = { content };
                if (parentId) payload.parent_id = parentId;

                const config = useRuntimeConfig();
                const response = await $fetch<Comment>(`${config.public.apiBase}posts/${postId}/comments`, {
                    method: 'POST',
                    body: payload
                });

                if (parentId) {
                    const parentComment = this.comments.find(comment => comment.id === parentId);
                    parentComment?.replies.push(response);
                } else {
                    this.comments.unshift(response);
                    this.totalItems++;
                }

                return response;
            } catch (error: any) {
                const errorMessage = error.data?.message || error.message || 'Failed to add comment';
                console.error('Error adding comment:', errorMessage);
                this.error = errorMessage;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async reactToComment(postId: number, commentId: number, type: ReactionType) {
            try {
                const config = useRuntimeConfig();
                await $fetch(`${config.public.apiBase}posts/${postId}/comments/${commentId}/react`, {
                    method: 'POST',
                    body: { type }
                });

                const updateReaction = (comments: Comment[]): boolean => {
                    for (const comment of comments) {
                        if (comment.id === commentId) {
                            comment.likes.push({
                                id: Date.now(),
                                user_id: 1,
                                type
                            });
                            return true;
                        }
                        if (comment.replies?.length && updateReaction(comment.replies)) return true;
                    }
                    return false;
                };

                updateReaction(this.comments);
            } catch (error: any) {
                console.error(`Error reacting to comment (${type}):`, error.message);
                throw error;
            }
        },

        async reportComment(postId: number, commentId: number, reason: string) {
            try {
                const config = useRuntimeConfig();
                await $fetch(`${config.public.apiBase}posts/${postId}/comments/${commentId}/report`, {
                    method: 'POST',
                    body: { reason }
                });
                logger('Comment reported successfully');
            } catch (error: any) {
                console.error('Error reporting comment:', error.message);
                throw error;
            }
        },

        async deleteComment(postId: number, commentId: number) {
            try {
                const config = useRuntimeConfig();
                await $fetch(`${config.public.apiBase}posts/${postId}/comments/${commentId}`, {
                    method: 'DELETE'
                });

                const removeComment = (comments: Comment[], id: number): boolean => {
                    const index = comments.findIndex(c => c.id === id);
                    if (index !== -1) {
                        comments.splice(index, 1);
                        this.totalItems--;
                        return true;
                    }
                    return comments.some(comment =>
                        comment.replies?.length && removeComment(comment.replies, id)
                    );
                };

                removeComment(this.comments, commentId);
            } catch (error: any) {
                console.error('Error deleting comment:', error.message);
                throw error;
            }
        },

        resetState() {
            this.comments = [];
            this.loading = false;
            this.error = null;
            this.page = 1;
            this.hasMore = true;
            this.totalPages = 0;
            this.totalItems = 0;
        }
    }
});
