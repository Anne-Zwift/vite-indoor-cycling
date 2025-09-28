import { NotFoundPage } from '../pages/NotFoundPage.ts';
import { PostFeedPage } from '../pages/PostFeedPage.ts';
import { LoginPage } from '../pages/LoginPage.ts';
import { RegisterPage } from '../pages/RegisterPage.ts';
import { PostPage } from '../pages/PostPage.ts';
import { ProfilePage } from '../pages/ProfilePage.ts';

/**
 * A class-based router for client-side navigation.
 */
export class Router {
  private routes: { [key: string]: () => HTMLDivElement };
  private contentElement: HTMLDivElement;

  constructor(routes: { [key: string]: () => HTMLDivElement }, contentElement: HTMLDivElement) {
    this.routes = routes;
    this.contentElement = contentElement;

    window.addEventListener('popstate', () => this.resolveRoute());
  }

  navigate(path: string) {
    history.pushState({}, '', path);
    this.resolveRoute();
  }

  resolveRoute() {
    const path = window.location.pathname;
    const view = this.routes[path] || NotFoundPage;

    this.contentElement.innerHTML = '';

    this.contentElement.appendChild(view());
  }
}


/**
 * Defines the routes for the app.
 * Each key is a URL path and the value is a function that returns corresponding page element.
 */

export const routes = {
  '/': PostFeedPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/post': PostPage,
  '/profile': ProfilePage,
  '/notFound': NotFoundPage,
} as const;