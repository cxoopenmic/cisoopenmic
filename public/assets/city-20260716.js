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

const publicHero = document.querySelector('.city-hero,.events-hero,.application-hero');
const siteHead = document.querySelector('.site-head');
if (publicHero && siteHead) {
  document.body.style.setProperty('--public-header-hero', publicHero.matches('.city-hero') ? '#071020' : '#e3481d');
  const syncPublicHeader = () => {
    const edge = siteHead.getBoundingClientRect().bottom;
    const bounds = publicHero.getBoundingClientRect();
    document.body.dataset.publicHeader = bounds.top <= edge && bounds.bottom > edge ? 'hero' : 'content';
  };
  syncPublicHeader();
  addEventListener('scroll', syncPublicHeader, { passive:true });
  addEventListener('resize', syncPublicHeader);
}
