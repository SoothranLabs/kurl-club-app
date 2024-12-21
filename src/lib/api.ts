import { API_BASE_URL } from '@/lib/utils';

type Params = Record<string, string | number | boolean>;

interface ApiError {
  message?: string;
  status: string;
}

const baseFetch: typeof fetch = async (url, options) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
    next: {
      revalidate: 3600, // revalidate at most every hour
      ...options?.next,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ApiError;
    throw new Error(error.message || 'Unknown API error');
  }

  // Handle no-content response (204)
  if (response.status === 204) return;

  return response.json();
};

interface GetOptions extends RequestInit {
  params?: Params;
}

export const api = {
  get: async <TResponse>(url: string, options?: GetOptions) => {
    const path = options?.params
      ? `${url}?${new URLSearchParams(options.params as Record<string, string>)}`
      : url;
    return baseFetch(path, options) as Promise<TResponse>;
  },
  post: async <TResponse>(
    url: string,
    data?: Record<string, unknown>,
    options?: RequestInit
  ) => {
    return baseFetch(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }) as Promise<TResponse>;
  },
  put: async <TResponse>(
    url: string,
    data?: Record<string, unknown>,
    options?: RequestInit
  ) => {
    return baseFetch(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }) as Promise<TResponse>;
  },
  patch: async <TResponse>(
    url: string,
    data?: Record<string, unknown>,
    options?: RequestInit
  ) => {
    return baseFetch(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }) as Promise<TResponse>;
  },
  delete: async (
    url: string,
    data?: Record<string, unknown>,
    options?: RequestInit
  ) => {
    return baseFetch(url, {
      ...options,
      method: 'DELETE',
      body: JSON.stringify(data),
    });
  },
};
