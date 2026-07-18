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
  document.querySelectorAll('.legal-links').forEach((links) => {
    if (links.querySelector('.linkedin-footer-link')) return;
    const separator = document.createElement('span');
    separator.textContent = '·';
    separator.setAttribute('aria-hidden', 'true');
    const link = document.createElement('a');
    link.className = 'linkedin-footer-link';
    link.href = linkedInUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'LinkedIn';
    link.setAttribute('aria-label', 'Follow CISO Open Mic on LinkedIn');
    links.append(separator, link);
  });
})();
