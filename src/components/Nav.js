export function createNav(renderPage) {
  const nav = document.createElement('nav');

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Post', path: '/post' },
    { name: 'Profile', path: '/profile' },
  ];


links.forEach(linkData => {
  const link = document.createElement('a');
  link.href = linkData.path;
  link.textContent = linkData.name;
  link.dataset.path = linkData.path;

  link.addEventListener('click', (event) => {
    event.preventDefault();
    history.pushState({}, '', linkData.path);
    renderPage(linkData.path);
  });

  nav.appendChild(link);
});

return nav;
}
