/**
 * Main views of the application, the file represents the full login page.
 * It will use the imported code from components/LoginForm.js.
 * Wrapping it with any other elements needed for the page, such as a page title, background, or links to other pages (like the registration page).
 */

import { login } from '../api/authService';

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await login(email, password);
    console.log('Received login information:', data);
  } catch (error) {
    console.error('Failed to fetch login information', error.message);
  }
}

handleLogin();