/**
 * Managing post data: creating, reading, updating posts.
 * Importing generic from src/apiClient
 */

import { get, post, put, del } from './apiClient.ts';


/**
 * Interface for a single post's media.
 * Interface for a single post's counts.
 */
export interface Media {
  url: string;
  alt: string;
}

export interface PostCounts {
  comments: number;
  reactions: number;
}

/**
 * Core structure (interface) for a blog post data object matching the 'data' field of API response.
 * Allow media to be null if not present.
 * Using string to match the ISO date format from the API.
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: Media | null;
  created: string;
  updated: string;
  _count: PostCounts;
  author: { name: string; };
}

export interface PostCreateBody {
  title: string;
  body?: string;
  tags?: string[];
  media?: {
    url: string;
    alt: string;
  };
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

export interface ReactionBody {
 symbol: string;
}

export interface CommentCreateBody {
 body: string;
 replyToId?: number;
}

export interface Comment {
  body: string;
  id: number;
  postId: number;
  owner: string;
  created: string;
  replyToId: number | null;
  
}

export interface ReactionResponseData {
  postId: number;
  symbol: string;
  reactions: Array<{
   symbol: string;
    count: number;
    reactors: string[];
  }>;
}

/**
 * Adds a reaction (symbol) to a post.
 * @param id The post ID.
 * @param symbol The reaction symbol (e.g., '😊').
 * @returns Promise<ReactionResponseData> The updated reaction count data.
 */
export async function reactToPost(id: number, symbol: string): Promise<ReactionResponseData | undefined> {

  try {
    const response = await put<ReactionResponseData>(`social/posts/${id}/react/${symbol}`);

    return response?.data;

  } catch (error) {
    console.error(`Error reacting to post ${id}:`, error);
    throw error;
  }
}


/**
 * Adds comments to a post.
 * @param id The post ID.
 * @param body The comment content and optionally replyToId.
 * @returns Promise<Comment> The newly created comment object.
 */
export async function commentOnPost(id: number, body: CommentCreateBody): Promise<Comment | undefined> {

  try {
    const response = await post<Comment, CommentCreateBody>(`social/posts/${id}/comment`, body);

    return response?.data;

  } catch (error) {
    console.error(`Error commenting on post ${id}:`, error);
    throw error;
  }
}


/**
 * Deletes a post based on its id.
 * @param id The post ID to delete.
 * @returns Promise<void> Returns nothing on success 204 No content.
 */
export async function deletePost(id: number): Promise<void> {

  try {
    await del<unknown>(`social/posts/${id}`);

  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
}

/**
 * Deletes a specific comment from a post.
 * @param postId The ID of the post.
 * @param commentId The ID of the comment to delete.
 * @returns Promise<void> Returns nothing on success 204 No content.
 */
export async function deleteComment(postId: number, commentId: number): Promise<void> {

  try {
    await del<unknown>(`social/posts/${postId}/comment/${commentId}`);

  } catch (error) {
    console.error(`Error deleting comment ${commentId} on post ${postId}:`, error);
    throw error;
  }
}

const POSTS_ENDPOINT = 'social/posts';

/**
 * Retrieves a list of posts from the feed.
 * This function fetches all social posts, including author and comment/reaction counts.
 * Handles the API response wrapper, returning only the array of Post objects
 * @async
 * @returns {Promise<Post[]>} A promise that resolves to an array of the Post objects, or an empty array if no data is returned.
 * @throws {Error} Throws an error if the API call fails.
 */

export async function getPostFeed(): Promise<Post[]> {
  try {
    const response = await get<Post[]>(POSTS_ENDPOINT + '?_author=true&_comments=true');

    return response ? response.data : [];
  } catch (error) {
    console.error('Error fetching post feed:', error);
    throw error;
  }
}

/**
 * Retrieves a single post by its ID.
 * This function fetches a specific post, including author and comment/reaction counts.
 * @async
 * @param {number} id The unique identifier of the post to retrieve.
 * @returns {Promise<Post[]>} A promise that resolves to a single Post objects, or undefined if the post is not found or data is null.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function getPost(id: number): Promise<Post | undefined> {
  try {
    const response = await get<Post>(`${POSTS_ENDPOINT}/${id}?_author=true&_comments=true`);

    return response?.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
}