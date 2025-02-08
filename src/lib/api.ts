import { API_BASE_URL } from './utils/index';

type Params = Record<string, string | number | boolean>;

const baseFetch: typeof fetch = async (url, options = {}) => {
  const { next, ...restOptions } = options as RequestInit & {
    next?: { revalidate?: number; cache?: string };
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(restOptions.headers || {}),
    },
    ...restOptions,
    next: {
      cache: next?.cache || 'no-store',
      ...next,
    },
  });

  if (!response.ok) {
    let errorMessage = 'Unknown API error';

    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      const text = await response.text();
      console.error('Response body:', text);
    }

    throw new Error(errorMessage);
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
    data?: Record<string, unknown> | FormData,
    options?: RequestInit
  ) => {
    const isFormData = data instanceof FormData;

    return baseFetch(url, {
      ...options,
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(options?.headers || {}),
      },
    }) as Promise<TResponse>;
  },
  put: async <TResponse>(
    url: string,
    data?: Record<string, unknown> | FormData,
    options?: RequestInit
  ) => {
    const isFormData = data instanceof FormData;

    return baseFetch(url, {
      ...options,
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(options?.headers || {}),
      },
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
