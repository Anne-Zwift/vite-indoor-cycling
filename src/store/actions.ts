/**
 * This file contains the login, logout, and setRouter functions.
 */

import { state } from './store.ts'; 
import { Router } from '../router/router.ts';

import type { LoginCredentials, UserProfile } from '../api/authService.ts';
import { login as authLogin } from '../api/authService.ts';
import { clearAccessToken, getAccessToken } from '../utils/authUtils.ts';
import { getProfile } from '../api/profileService.ts';
 

let router: Router | null = null; 

export function setRouter(routerInstance: Router): void { 
  router = routerInstance; 
} 

function navigate(path: string): void {
  router?.navigate(path);
}

export async function checkAuthStatus(): Promise<void> {
  const token = getAccessToken();

  if (token) {
    try {
      const profile = await getProfile();

      if (profile) {
        state.userProfile = profile;
        state.isLoggedIn = true;
        router?.resolveRoute();
      }
    } catch (error) {
      clearAccessToken();
      state.isLoggedIn = false;
      console.error('Token validation failed. Cleared token.', error);
    }
  }

}

export async function login(credentials: LoginCredentials): Promise<void> { 
try {
  const profile = await authLogin(credentials);

  if (profile) {
    state.userProfile = profile;
    state.isLoggedIn = true;
    navigate('/');
  }
} catch (error) {
  throw error;
}
} 
 
export function logout(): void { 
  clearAccessToken();
  state.isLoggedIn = false; 
  state.userProfile = null; 
  router?.resolveRoute(); // Re-render again. 

  navigate('/login');
} 