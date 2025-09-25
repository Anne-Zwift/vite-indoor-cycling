/**
 * Handling authentication-related requests: Login, register etc. 
 * Importing generic from src/apiClient
 */

import { post } from "./apiClient";

export async function login(email, password) {

  try {
    const response = await post('/auth/login', { email, password });
    return response;
  } catch (error) {
    console.error('Login failed:', error);
  }
  
}

export async function register(name, email, password) {
  try {
    const response = await post('/auth/register', { name, email, password });
    return response;
  } catch (error) {
    console.error('Register failed:', error);
  }
}