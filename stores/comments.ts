import { defineStore } from "pinia";
import type { Comment, CommentsState, CommentResponse, ReactionType } from "~/types/comment";
import { AxiosError, AxiosInstance } from "axios";

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

            const { $axios } = useNuxtApp<{
                $axios: AxiosInstance;
            }>();

            try {
                const response = await $axios.get<CommentResponse>(`/public/api/posts/${postId}/comments`, {
                    params: {
                        page: page,
                        per_page: this.perPage
                    }
                });

                console.log('Fetched comments:', response.data);

                // Если это первая страница, заменяем комментарии, иначе добавляем
                if (page === 1) {
                    this.comments = response.data.comments;
                } else {
                    this.comments.push(...response.data.comments);
                }

                // Обновляем метаданные
                this.totalPages = response.data.meta.totalPages;
                this.totalItems = response.data.meta.totalItems;
                this.page = page;
                this.hasMore = page < response.data.meta.totalPages;
            } catch (err: unknown) {
                const error = err as AxiosError<{ message?: string }>;
                const errorMessage =
                    error.response?.data?.message || error.message || 'Failed to fetch comments';
                console.error('Error fetching comments:', errorMessage);
                this.error = errorMessage;
            } finally {
                this.loading = false;
            }
        },

        async addComment(postId: number, content: string, parentId?: number) {
            this.loading = true;
            this.error = null;

            const { $axios } = useNuxtApp<{
                $axios: AxiosInstance;
            }>();

            try {
                const payload: { content: string; parent_id?: number } = {
                    content
                };

                if (parentId) {
                    payload.parent_id = parentId;
                }

                const response = await $axios.post<Comment>(`/public/api/posts/${postId}/comments`, payload);

                // Если это ответ на комментарий
                if (parentId) {
                    const parentComment = this.comments.find(comment => comment.id === parentId);
                    if (parentComment) {
                        parentComment.replies.push(response.data);
                    }
                } else {
                    // Если это новый комментарий верхнего уровня
                    this.comments.unshift(response.data);
                    this.totalItems++;
                }

                return response.data;
            } catch (err: unknown) {
                const error = err as AxiosError<{ message?: string }>;
                const errorMessage =
                    error.response?.data?.message || error.message || 'Failed to add comment';
                console.error('Error adding comment:', errorMessage);
                this.error = errorMessage;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async reactToComment(postId: number, commentId: number, type: ReactionType) {
            const { $axios } = useNuxtApp<{
                $axios: AxiosInstance;
            }>();

            try {
                await $axios.post(`/public/api/posts/${postId}/comments/${commentId}/react`, { type });

                // Находим комментарий и обновляем его лайки
                const updateReaction = (comments: Comment[]) => {
                    for (const comment of comments) {
                        if (comment.id === commentId) {
                            // В реальном приложении здесь должен быть более сложный код,
                            // который проверяет, есть ли уже реакция от этого пользователя
                            // и обновляет ее соответствующим образом

                            // Для простоты просто добавляем новую реакцию
                            comment.likes.push({
                                id: Date.now(),
                                user_id: 1, // Предполагаем, что это ID текущего пользователя
                                type
                            });
                            return true;
                        }

                        if (comment.replies && comment.replies.length > 0) {
                            if (updateReaction(comment.replies)) {
                                return true;
                            }
                        }
                    }
                    return false;
                };

                updateReaction(this.comments);
            } catch (err: unknown) {
                const error = err as AxiosError<{ message?: string }>;
                console.error(`Error reacting to comment (${type}):`, error.message);
                throw error;
            }
        },

        async reportComment(postId: number, commentId: number, reason: string) {
            const { $axios } = useNuxtApp<{
                $axios: AxiosInstance;
            }>();

            try {
                await $axios.post(`/public/api/posts/${postId}/comments/${commentId}/report`, { reason });
                console.log('Comment reported successfully');
            } catch (err: unknown) {
                const error = err as AxiosError<{ message?: string }>;
                console.error('Error reporting comment:', error.message);
                throw error;
            }
        },

        async deleteComment(postId: number, commentId: number) {
            const { $axios } = useNuxtApp<{
                $axios: AxiosInstance;
            }>();

            try {
                await $axios.delete(`/public/api/posts/${postId}/comments/${commentId}`);

                // Удаляем комментарий из состояния
                const removeComment = (comments: Comment[], id: number): boolean => {
                    const index = comments.findIndex(c => c.id === id);
                    if (index !== -1) {
                        comments.splice(index, 1);
                        this.totalItems--;
                        return true;
                    }

                    // Ищем в ответах
                    for (const comment of comments) {
                        if (comment.replies && comment.replies.length > 0) {
                            if (removeComment(comment.replies, id)) {
                                return true;
                            }
                        }
                    }

                    return false;
                };

                removeComment(this.comments, commentId);
            } catch (err: unknown) {
                const error = err as AxiosError<{ message?: string }>;
                console.error('Error deleting comment:', error.message);
                throw error;
            }
        },

        // Сбросить состояние при переходе на другой пост
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
