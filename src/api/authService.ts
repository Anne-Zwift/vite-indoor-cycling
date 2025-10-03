/**
 * Handling authentication-related requests: Login, register etc. 
 * Importing generic from src/apiClient
 */

import { post } from "./apiClient";
import { setAccessToken } from "../utils/authUtils";


export interface RegisterBody {
  name: string; // Required
  email: string; // Required
  password: string; // Required
  bio?: string; // Optional
  avatar?: {
    url: string; // Optional
    alt: string; // Optional
  };
  banner?: {
    url: string; // Optional
    alt: string; // Optional
  };
  venueManager: boolean; // Optional
}


export interface LoginCredentials {
 email: string;
 password: string;
}

export interface UserProfile {
    name: string;
    email: string;
    bio?: string;
    avatar?: {
      url: string;
      alt: string;
    } | null;
    banner?: {
      url: string;
      alt: string;
    } | null;
    venueManager: boolean;
    id?: number;
}

export interface AuthResponseData extends UserProfile {
  accessToken: string;
}

export async function login(credentials: LoginCredentials): Promise<UserProfile | undefined> {

  try {

    const response = await post<AuthResponseData, LoginCredentials>('/auth/login', credentials);
  
    if (response && response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      const { accessToken, ...userProfile } = response.data;
      return userProfile as UserProfile;
    } 
  } catch (error) {
    console.error('Login failed:', error);
    throw error;  
  }
}

export async function register(body: RegisterBody): Promise<UserProfile | undefined> {

  try {

    const response = await post<AuthResponseData, RegisterBody>('/auth/register', body);
    
    if (response && response.data.accessToken) {
      setAccessToken(response.data.accessToken);

      const { accessToken, ...userProfile } = response.data;

      return userProfile as UserProfile;
    }
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
}