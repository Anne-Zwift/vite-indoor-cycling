/**
 * This file contains the login, logout, and setRouter functions.
 */

import { state } from './store.ts'; 
import { Router } from '../router/router.ts'
 
type UserProfile = { name: string };

let router: Router | null = null; 

export function setRouter(routerInstance: Router): void { 
  router = routerInstance; 
} 
 
export function login(user: UserProfile): void { 
  state.isLoggedIn = true; 
  state.userProfile = user; 
  router?.resolveRoute();
} 
 
export function logout(): void { 
  state.isLoggedIn = false; 
  state.userProfile = null; 
  router?.resolveRoute(); // Re-render again. 
} 