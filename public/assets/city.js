const toggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('ciso-theme');

if (savedTheme === 'dark') {
  document.body.classList.remove('light');
  toggleBtn.textContent = 'Light';
  toggleBtn.setAttribute('aria-label', 'Switch to light theme');
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  toggleBtn.textContent = isLight ? 'Dark' : 'Light';
  toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  localStorage.setItem('ciso-theme', isLight ? 'light' : 'dark');
});
