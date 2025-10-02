/**
 * Generic Function, handles the core logic of making an API call.
 * The client function contains the base URL of the API. 
 * Accept an endpoint and other fetch options. 
 * Set default headers for all requests. 
 * Perform the fetch call. 
 * Centralize the response.ok
 * Parse the JSON response
 */

import { BASE_URL, API_KEY } from '../constants.ts';
import { getAccessToken } from '../utils/authUtils.ts';

export interface ApiResponse<T> {
  data: T; // This holds the actual Post or array of Posts
  meta: {}; // Structure of meta here
}

export interface ApiOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: {
    url: string;
    alt: string;
  } | null;
  created: string;
  updated: string;
  author: {
    name: string;
  }
  _count: {
    comments: number;
    reactions: number;
  }
}

export interface PostCreateBody {
  title: string; // Required
  body?: string; // Optional
  tags?: string[]; // Optional
  media?: {
    url: string;
    alt: string;
  }; // Optional
}

export interface UpdatePostBody {
  title?: string;
  body?: string;
  tags?: string[];
  media?: {
    url: string;
    alt: string;
  };
}

export interface ReactResponseData {
    postId: number;
    symbol: string;
    reactions: Array<{
        symbol: string;
        count: number;
        reactors: string[];
    }>;
}

export interface CommentCreateBody {
  body: string;
  replyToId?: number;
}

//Still have to think of: Search for posts by their title or body properties.
//Delete a post based on its id. Returns an empty 204 No Content response on success.



async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<ApiResponse<T> | null> {
  const { body, ...customOptions } = options;

  const accessToken = getAccessToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'API-KEY': 'API_KEY',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const config: RequestInit = {
    method: customOptions.method || (body ? 'POST' : 'GET'),
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    } as HeadersInit,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(BASE_URL + endpoint, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || 'An API error occurred',
      );
    }

    // If the response has no content (e.g., a 204 No Content), no need to parse it
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Client Error:', error);
    // Re-throw the error so the calling code can handle it
    throw error;
  }
}

// Export helper methods
// GET and DELETE only require the response type <T>
export const get = <T>(endpoint: string): Promise<ApiResponse<T> | null> => apiClient<T>(endpoint);

export const del = <T>(endpoint: string): Promise<ApiResponse<T> | null> => apiClient<T>(endpoint, { method: 'DELETE'});

// POST and PUT require both the response type <T> and the request body type <D>
export const post = <T, D = unknown>(endpoint: string, body: D): Promise<ApiResponse<T> | null> => apiClient<T>(endpoint, { body });

export const put = <T, D = unknown>(endpoint: string, body: D): Promise<ApiResponse<T> | null> => apiClient(endpoint, { method: 'PUT', body });

