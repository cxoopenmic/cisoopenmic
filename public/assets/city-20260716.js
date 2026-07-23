const toggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('ciso-theme');
const lightAriaLabel = toggleBtn.dataset.lightAriaLabel || 'Switch to light theme';
const darkAriaLabel = toggleBtn.dataset.darkAriaLabel || 'Switch to dark theme';

if (savedTheme === 'dark') {
  document.body.classList.remove('light');
  toggleBtn.textContent = '☀';
  toggleBtn.setAttribute('aria-label', lightAriaLabel);
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  toggleBtn.textContent = '☀';
  toggleBtn.setAttribute('aria-label', isLight ? darkAriaLabel : lightAriaLabel);
  localStorage.setItem('ciso-theme', isLight ? 'light' : 'dark');
});
