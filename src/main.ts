import './style.css'
import { createNav } from './components/Nav.ts';
import { Router, routes } from './router/router.ts';

import { setRouter, login, logout } from './store/actions.ts';

/**
 * Main application file.
 * This file handles client-side routing and component rendering.
 */

// Select the main containers from the DOM.
const navContainer = document.querySelector<HTMLDivElement>('#nav-container');
const contentElement = document.querySelector<HTMLDivElement>('#content-area');

/**
 * Initializes the application by setting up the router, navigation, and event listeners.
 */
function initialize() {
if (navContainer && contentElement) {
  // Create an instance of the Router class.
  const router = new Router(routes, contentElement);

  setRouter(router);

  const navElement = createNav((path: string) => {
    router.navigate(path);
  });

  // Append the created navigation element to the nav container.
  navContainer.appendChild(navElement);

contentElement.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  if (target.id === 'login-button') {
    login({ name: 'Jane Doe'});
  }

  if (target.id === 'logout-button') {
    logout();
  }

});
  //Resolve
  router.resolveRoute();

} else {
  console.error('Required DOM elements not found (#nav-container or #content-area). Please check your index.html file.');
}
}

initialize();