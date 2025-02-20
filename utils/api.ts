export const useApiFetch = async <T>(
    url: string,
    options: { query?: Record<string, any>; token?: string } = {}
) => {
    const config = useRuntimeConfig()

    return useFetch<T>(url, {
        baseURL: config.public.apiBase,
        headers: options.token ? { Authorization: `Bearer ${options.token}` } : {},
        query: options.query
    })
}
