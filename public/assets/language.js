(() => {
  const pairs = [
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
    const url = new URL(link.getAttribute('href'), location.href);
    if (url.origin !== location.origin) return;
    const pair = pairs.find(([en]) => normalize(en) === normalize(url.pathname));
    if (!pair) return;
    url.pathname = pair[1];
    // FAQ question slugs are language-specific; section anchors are shared.
    if (pair[0] === '/faq/' && url.hash.startsWith('#faq-')) url.hash = '';
    link.href = url.pathname + url.search + url.hash;
  });
})();
