/**
 * Export reusable code for UI to the pages/LoginPage.ts.
 * The input fields for username and password, 
 * The submit button, 
 * Validation logic for fields mentioned above. 
 * It's designed to be a self-contained, reusable block of code.
 */

/**
 * Creates and returns the HTML for the reusable login form.
 * @returns {HTMLFormElement} The login form element.
 */

export function createLoginForm(): HTMLFormElement {
  const form = document.createElement('form');
  form.id = 'login-form';
  form.className = 'flex flex-col space-y-4 p-4 border rounded shadow';

  form.innerHTML = `
  <h2 class="text-xl font-bold">Account Login</h2>
  <input type="email" id="email-input" placeholder="Email" required class="p-2 border rounded" name="email">
  <input type="password" id="password-input" placeholder="Password" required class="p-2 border rounded" name="email">
  <button type="submit" class="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Log In</button>
  `;
  return form;
}