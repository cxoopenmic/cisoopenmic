(function () {
  const navigation = document.querySelector('.site-head nav');
  if (!navigation || navigation.querySelector('[href="/account/"]')) return;
  const link = document.createElement('a');
  link.className = 'account-nav-link';
  link.href = '/account/';
  link.title = 'My Account';
  link.setAttribute('aria-label', 'My Account');
  link.style.display = 'inline-flex';
  link.style.alignItems = 'center';
  link.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>';
  const themeToggle = navigation.querySelector('.theme-toggle');
  navigation.insertBefore(link, themeToggle || null);
})();
