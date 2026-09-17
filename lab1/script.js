const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const actionButton = document.getElementById('actionButton');
const cardMessage = document.getElementById('cardMessage');
const cardSubtitle = document.getElementById('cardSubtitle');
const clickCounter = document.getElementById('clickCounter');
const statusBadge = document.getElementById('statusBadge');
const demoCard = document.getElementById('demoCard');

const states = [
  {
    badge: 'Ready',
    message: 'Press the button',
    subtitle: 'Tap to start the cycle.',
    state: 'idle',
    bg: 'var(--success-soft)',
    text: 'var(--success-color)',
  },
  {
    badge: 'Active',
    message: 'Nice!',
    subtitle: 'The flow is starting.',
    state: 'active',
    bg: 'var(--active-soft)',
    text: '#60a5fa',
  },
  {
    badge: 'Boosted',
    message: 'Awesome!',
    subtitle: 'You are getting stronger.',
    state: 'boosted',
    bg: 'var(--boosted-soft)',
    text: '#fbbf24',
  },
  {
    badge: 'Legend',
    message: 'Legendary!',
    subtitle: 'You reached the peak.',
    state: 'legend',
    bg: 'var(--legend-soft)',
    text: '#34d399',
  },
  {
    badge: 'Epic',
    message: 'Maximum energy!',
    subtitle: 'This is the final mode.',
    state: 'legend',
    bg: 'var(--legend-soft)',
    text: '#34d399',
  },
  {
    badge: 'Reset',
    message: 'Start over!',
    subtitle: 'The cycle is back to the beginning.',
    state: 'idle',
    bg: 'var(--success-soft)',
    text: 'var(--success-color)',
  },
];

let clickCount = 0;

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  body.classList.toggle('theme-light', isLight);

  if (themeToggle) {
    themeToggle.textContent = isLight ? 'Dark mode' : 'Light mode';
    themeToggle.setAttribute(
      'aria-label',
      isLight ? 'Switch to dark theme' : 'Switch to light theme',
    );
  }
};

const getStoredTheme = () => {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // ignore storage
  }
};

const updateCardState = () => {
  const index = clickCount % states.length;
  const current = states[index];

  clickCounter.textContent = String(clickCount);
  cardMessage.textContent = current.message;
  cardSubtitle.textContent = current.subtitle;
  statusBadge.textContent = current.badge;
  statusBadge.style.background = current.bg;
  statusBadge.style.color = current.text;

  demoCard.dataset.state = current.state;

  demoCard.classList.remove('pulse');
  void demoCard.offsetWidth;
  demoCard.classList.add('pulse');
};

const savedTheme = getStoredTheme();
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme) {
  applyTheme(savedTheme);
} else if (systemPrefersLight) {
  applyTheme('light');
} else {
  applyTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('theme-light');
    const nextTheme = isLight ? 'dark' : 'light';
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

if (actionButton) {
  actionButton.addEventListener('click', () => {
    clickCount += 1;
    updateCardState();
  });
}

updateCardState();
