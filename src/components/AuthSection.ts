import { state } from '../store/store.ts'; 


/**
 * Creates and returns the HTML element for the authentication status section.
 * This function reads from the global 'state' object.
 * @returns {HTMLDivElement} A div containing the status and a button
 */
export function createAuthSection(): HTMLDivElement { 
  const container = document.createElement('div');
  container.className = 'flex items-center space-x-4';

  if (state.isLoggedIn) {
    const userNameSpan = document.createElement('span');

    const userName = state.userProfile ? state.userProfile.name : 'User';
    userNameSpan.textContent = `Welcome, ${userName}`;
    userNameSpan.className = 'text-gray-700 font medium';
    container.appendChild(userNameSpan);

    const logoutButton = document.createElement('button');
    logoutButton.id = 'logout-button';
    logoutButton.textContent = 'Log Out';
    logoutButton.className = 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition';
    container.appendChild(logoutButton);

  } else {
    const loggedOutSpan = document.createElement('span');
    loggedOutSpan.textContent = 'You are logged out.';
    loggedOutSpan.className = 'text-gray-500';
    container.appendChild(loggedOutSpan);

    const loginButton = document.createElement('button');
    loginButton.id = 'login-button';
    loginButton.textContent = 'Log IN';
    loginButton.className = 'bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition';
    container.appendChild(loginButton);
  }

  return container;
}