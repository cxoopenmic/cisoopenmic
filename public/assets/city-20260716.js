const toggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('ciso-theme');
const lightLabel = toggleBtn.dataset.lightLabel || 'Light';
const darkLabel = toggleBtn.dataset.darkLabel || 'Dark';
const lightAriaLabel = toggleBtn.dataset.lightAriaLabel || 'Switch to light theme';
const darkAriaLabel = toggleBtn.dataset.darkAriaLabel || 'Switch to dark theme';

if (savedTheme === 'dark') {
  document.body.classList.remove('light');
  toggleBtn.textContent = lightLabel;
  toggleBtn.setAttribute('aria-label', lightAriaLabel);
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  toggleBtn.textContent = isLight ? darkLabel : lightLabel;
  toggleBtn.setAttribute('aria-label', isLight ? darkAriaLabel : lightAriaLabel);
  localStorage.setItem('ciso-theme', isLight ? 'light' : 'dark');
});

(() => {
  const linkedInUrl = 'https://www.linkedin.com/showcase/cisoopenmic';
  document.querySelectorAll('footer').forEach((footer) => {
    const copyright = footer.firstElementChild;
    if (!copyright || copyright.querySelector('.linkedin-footer-link')) return;
    const link = document.createElement('a');
    link.className = 'linkedin-footer-link';
    link.href = linkedInUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'in';
    link.title = 'Follow CISO Open Mic on LinkedIn';
    link.setAttribute('aria-label', 'Follow CISO Open Mic on LinkedIn');
    link.style.cssText = 'display:inline-grid;place-items:center;width:23px;height:23px;margin-left:9px;border-radius:5px;background:#0a66c2;color:#fff;font-size:12px;font-weight:800;line-height:1;text-decoration:none;vertical-align:middle';
    copyright.append(link);
  });
})();
