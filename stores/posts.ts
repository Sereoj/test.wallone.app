import { defineStore } from 'pinia'

interface User {
    username: string
    slug: string
    verification: boolean
    avatar?: { path: string }
}

interface Media {
    path: string
    mime_type: string
    type: string
}

interface Post {
    title: string
    slug: string
    is_adult_content: boolean
    is_nsfl_content: boolean
    is_free: boolean
    has_copyright: boolean
    user: User
    media: Media[]
    created_at: string
    updated_at: string
}

export const usePostStore = defineStore('posts', {
    state: () => ({
        posts: [] as Post[],
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchPosts() {
            this.loading = true
            this.error = null
            try {
                const { data, error } = await useApiFetch<Post[]>('/public/api/posts', {
                    query: { per_page: 20, page_offset: 0 }
                })

                if (error.value) throw new Error(error.value.message)
                if (data.value) this.posts = data.value
            } catch (err) {
                this.error = (err as Error).message
            } finally {
                this.loading = false
            }
        }
    }
})
