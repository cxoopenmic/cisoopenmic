const mainNavigation = document.querySelector('.site-head nav');
if (mainNavigation && !mainNavigation.querySelector('[href="/account/"]')) {
  const accountLink = document.createElement('a');
  accountLink.className = 'account-nav-link';
  accountLink.href = '/account/';
  accountLink.title = 'My Account';
  accountLink.setAttribute('aria-label', 'My Account');
  accountLink.style.display = 'inline-flex';
  accountLink.style.alignItems = 'center';
  accountLink.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>';
  const themeToggle = mainNavigation.querySelector('.theme-toggle');
  mainNavigation.insertBefore(accountLink, themeToggle || null);
}

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

const cityTeam = document.querySelector('.city-team');
if (cityTeam) {
  const pathParts = location.pathname.split('/').filter(Boolean);
  const citySlug = cityTeam.dataset.teamRoster || pathParts[1] || '';
  const groups = cityTeam.querySelectorAll('.team-groups > div');
  const leads = cityTeam.querySelector('[data-team-leads]') || groups[0]?.querySelector('.team-grid');
  const judges = cityTeam.querySelector('[data-team-judges]') || groups[1]?.querySelector('.team-grid');
  const existingLabels = [...cityTeam.querySelectorAll('.team-role')].map((item) => item.textContent.trim());
  const labels = {
    director: existingLabels[0] || 'Event Director',
    mc: existingLabels[1] || 'Master of Ceremonies',
    judge: existingLabels[2] || 'Judge'
  };
  const marks = { director: labels.director.startsWith('Direction') ? 'DE' : 'ED', mc: 'MC' };

  function liveTeamCard(person, role, mark, featured) {
    const article = document.createElement('article');
    article.className = `team-card has-person${featured ? ' featured' : ''}`;
    let visual;
    if (person.headshotUrl) {
      visual = document.createElement('img');
      visual.className = 'role-mark';
      visual.src = person.headshotUrl;
      visual.alt = '';
      visual.style.cssText = 'object-fit:cover;object-position:center;padding:0';
    } else {
      visual = document.createElement('span');
      visual.className = 'role-mark';
      visual.setAttribute('aria-hidden', 'true');
      visual.textContent = mark;
    }
    const content = document.createElement('div');
    const roleLabel = document.createElement('span');
    roleLabel.className = 'team-role';
    roleLabel.textContent = labels[role] || role;
    const name = document.createElement('span');
    name.className = 'team-name';
    if (person.linkedinUrl) {
      const link = document.createElement('a');
      link.href = person.linkedinUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.style.cssText = 'color:inherit;text-decoration:none';
      link.textContent = person.name;
      name.appendChild(link);
    } else {
      name.textContent = person.name;
    }
    content.append(roleLabel, name);
    for (const value of [person.title, person.bio]) {
      if (!value) continue;
      const note = document.createElement('span');
      note.className = 'team-note';
      note.textContent = value;
      content.appendChild(note);
    }
    article.append(visual, content);
    return article;
  }

  if (/^[a-z0-9-]{2,80}$/.test(citySlug) && leads && judges) {
    fetch(`/team/roster?city=${encodeURIComponent(citySlug)}`, { credentials: 'omit' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data || !Array.isArray(data.members) || !data.members.length) return;
        const director = data.members.find((person) => person.role === 'director');
        const mc = data.members.find((person) => person.role === 'mc');
        const panel = data.members.filter((person) => person.role === 'judge').slice(0, 4);
        if (director || mc) {
          leads.replaceChildren();
          if (director) leads.appendChild(liveTeamCard(director, 'director', marks.director, true));
          if (mc) leads.appendChild(liveTeamCard(mc, 'mc', marks.mc, true));
        }
        if (panel.length) judges.replaceChildren(...panel.map((person, index) => liveTeamCard(person, 'judge', `J${index + 1}`, false)));
      })
      .catch(() => {});
  }
}
