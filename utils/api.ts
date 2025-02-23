export const customFetch = async <T>(
    url: string,
    { query, token, method = 'GET', body }:
        { query?: Record<string, any>; token?: string; method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: any } = {}
): Promise<{ data: T | null; error: any }> => {
    const config = useRuntimeConfig();
    const queryParams = query ? `?${new URLSearchParams(query).toString()}` : '';
    const fullUrl = `${config.public.apiBase}${url}${queryParams}`;

    try {
        const response = await fetch(fullUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            ...(body && ['POST', 'PUT', 'DELETE'].includes(method) && { body: JSON.stringify(body) }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error(`API Error (${response.status}): ${errorMessage}`);
            return { data: null, error: { status: response.status, message: errorMessage } };
        }

        return { data: (await response.json()) as T, error: null };
    } catch (err: any) {
        console.error('Error during API request:', err.message);
        return { data: null, error: err };
    }
};
