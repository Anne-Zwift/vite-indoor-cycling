import './style.css'
import { createNav } from './components/Nav.ts';

/**
 * Main application file.
 * This file handles client-side routing and component rendering.
 */

// Select the main containers from the DOM.
// These are the designated areas for the navigation and dynamic content.
const navContainer = document.querySelector<HTMLDivElement>('#nav-container');
const contentArea = document.querySelector<HTMLDivElement>('#content-area');

/**
 * Renders the content for a given path.
 * This function is the core of our client-side router.
 * @param path The URL path to render (e.g., '/', '/login').
 */
function renderPage(path: string) {
  let content = '';
  // Use a switch statement to determine the content based on the path.  
  switch (path) {
    case '/':
      content = '<h1>Home</h1><p>This blog is about indoor Cycling</p>';
      break;
    case '/login':
      content = '<h1>Login</h1><p>Login to continue</p>';
      break;
    case '/register':
      content = '<h1>Register</h1><p>Create a new account</p>';
      break;
    case '/post':
      content = '<h1>Post</h1><p>Create a new post</p>';
      break;
    case '/profile':
      content = '<h1>Profile</h1><p>View and edit your profile</p>';
      break;  
    default:
      content = '<h1>404 Not found</h1><p>The page you are looking for does not exist.</p>';
      break;
  }
  // Update the inner HTML of the content area.
  if (contentArea) {
    contentArea.innerHTML = content;
  }

}

/**
 * Initializes the application.
 * This function checks for the required DOM elements and sets up the navigation and routing.
 */
function initialize() {
if (navContainer && contentArea) {
  // Create the navigation element using the Nav component.
  const navElement = createNav(renderPage);
  // Append the created navigation element to the nav container.
  navContainer.appendChild(navElement);
} else {
  console.error('Required DOM elements not found. Please check your index.html file.');
}
}

// Set up a listener for the browser's back and forward buttons.
// The popstate event is fired when the active history entry changes.
window.addEventListener('popstate', () => {
  // When the state changes, render the correct page content.
  renderPage(window.location.pathname);
});

 // Render the initial page content based on the URL when the application first loads.
renderPage(window.location.pathname);

initialize();



/*import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
//import { login } from '../src/api/authService.js';
//login();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Indoor|Cycling</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)*/
