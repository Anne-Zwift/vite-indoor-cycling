import { get } from './apiClient';
import type { UserProfile } from './authService';


const PROFILE_ENDPOINT = 'social/profile/Anne-Zwift?_venues=true&_followers=true&_following=true&_posts=true';

/**
 * Fetches the profile of the currently logged-in user.
 * This function serves to validate the access token.
 * @async
 * @returns {Promise<UserProfile | undefined>} The user's profile object.
 */

export async function getProfile(): Promise<UserProfile | undefined> {
  try {
    const response = await get<UserProfile>(PROFILE_ENDPOINT);

    return response?.data;
  } catch (error) {
    console.error('Error fetching profile to validate token:', error);
    throw error;
  }
}