import './style.css'
import { createNav } from './components/Nav.js';
import './style.css';

// Select the main containers
const navContainer = document.querySelector<HTMLDivElement>('#nav-container');
const contentArea = document.querySelector<HTMLDivElement>('#content-area');

function renderPage(path: string) {
  let content = '';
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
  if (contentArea) {
    contentArea.innerHTML = content;
  }

}

if (navContainer && contentArea) {
  const navElement = createNav(renderPage);
  navContainer.appendChild(navElement);
}

window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
});

renderPage(window.location.pathname);





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
