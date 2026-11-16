// Shared enhancement also reaches CMS-rendered pages without changing their desktop headers.
(() => {
  if (typeof window === 'undefined' || !document.currentScript?.src || window.cisoMobileMenuLoading) return;
  window.cisoMobileMenuLoading = true;
  const base = document.currentScript.src;
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = new URL('mobile-nav.css?v=menu-20261114', base).href;
  document.head.append(style);
  const script = document.createElement('script');
  script.src = new URL('mobile-nav.js?v=menu-20261114', base).href;
  document.head.append(script);
})();
(() => {
  const pairs = [
    ['/manifesto/', '/manifesto/fr/'],
    ['/faq/', '/faq/fr/'], ['/privacy', '/privacy/fr/'], ['/terms', '/terms/fr/'], ['/conduct', '/conduct/fr/'],
    ['/ca/montreal/', '/ca/montreal/fr/'], ['/ca/montreal/fall2026/', '/ca/montreal/fr/fall2026/']
  ];
  const normalize = path => path.replace(/\.html$/, '').replace(/\/$/, '');
  let preferred = document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';
  try {
    if (preferred === 'fr') localStorage.setItem('ciso-language','fr');
    else preferred = localStorage.getItem('ciso-language') === 'fr' ? 'fr' : 'en';
  } catch {} // Navigation still works when storage is unavailable.
  document.querySelectorAll('a[hreflang]').forEach(link => link.addEventListener('click', () => {
    try { localStorage.setItem('ciso-language', link.hreflang.startsWith('fr') ? 'fr' : 'en'); } catch {}
  }));
  if (preferred !== 'fr') return;
  document.querySelectorAll('a[href]:not([hreflang])').forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('#') || link.getAttribute('aria-current') === 'page') return;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;
    const pair = pairs.find(([en]) => normalize(en) === normalize(url.pathname));
    if (!pair) return;
    url.pathname = pair[1];
    // FAQ question slugs are language-specific; section anchors are shared.
    if (pair[0] === '/faq/' && url.hash.startsWith('#faq-')) url.hash = '';
    link.href = url.pathname + url.search + url.hash;
  });
})();
