/**
 *  The state object is defined here.
 * (eg. state = { isLoggedIn: false, userProfile: null })
 */
import type { UserProfile } from "../api/authService";

export const state = { 
  isLoggedIn: false, 
  userProfile: null as UserProfile | null, 
};