(() => {
  function initialize() {
    const header = document.querySelector('.site-head');
    const nav = header?.querySelector('nav');
    if (!nav || header.classList.contains('mobile-menu-ready')) return;
    const french = document.documentElement.lang.startsWith('fr');
    const media = matchMedia('(max-width: 600px)');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-menu-toggle';
    button.setAttribute('aria-label', french ? 'Ouvrir le menu' : 'Open menu');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'mobile-site-menu');
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    const panel = document.createElement('div');
    panel.id = 'mobile-site-menu';
    panel.className = 'mobile-menu-panel';
    panel.setAttribute('role', 'navigation');
    panel.setAttribute('aria-label', french ? 'Navigation mobile' : 'Mobile navigation');
    panel.hidden = true;
    const defaults = [
      ['/', french ? 'Accueil' : 'Home'], ['/blog/', 'Blog'],
      ['/sponsors/', french ? 'Commanditaires' : 'Sponsors'],
      ['/partners/', french ? 'Partenaires' : 'Partners'],
      [french ? '/faq/fr/' : '/faq/', 'FAQ'],
      ['/account/', french ? 'Mon compte' : 'My Account']
    ];
    function populate() {
      panel.replaceChildren();
      const originals = Array.from(nav.querySelectorAll(':scope > a'));
      const normalized = path => path.replace(/\/$/, '');
      for (const [href, label] of defaults) {
        const existing = originals.find(a => normalized(new URL(a.href).pathname) === normalized(href) || (href.includes('/faq/') && new URL(a.href).pathname.startsWith('/faq/')));
        const link = document.createElement('a');
        link.href = existing?.href || href;
        link.textContent = label;
        if (normalized(new URL(link.href).pathname) === normalized(location.pathname)) link.setAttribute('aria-current', 'page');
        panel.append(link);
      }
      for (const original of originals) {
        if (Array.from(panel.children).some(a => a.href === original.href)) continue;
        const link = document.createElement('a');
        link.href = original.href;
        link.textContent = original.textContent.trim() || original.getAttribute('aria-label') || original.title;
        if (original.hreflang) link.hreflang = original.hreflang;
        if (link.textContent) panel.append(link);
      }
    }
    function close(restoreFocus = false) {
      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', french ? 'Ouvrir le menu' : 'Open menu');
      if (restoreFocus) button.focus();
    }
    button.addEventListener('click', () => {
      if (!panel.hidden) return close();
      populate();
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', french ? 'Fermer le menu' : 'Close menu');
    });
    panel.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); close(true); }
    });
    document.addEventListener('click', event => { if (!header.contains(event.target)) close(); });
    document.addEventListener('focusin', event => { if (!header.contains(event.target)) close(); });
    media.addEventListener('change', () => close());
    nav.append(button);
    header.append(panel);
    header.classList.add('mobile-menu-ready');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
