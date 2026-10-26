const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
const progressBar = document.querySelector('.reading-progress span');
const themeSwitch = document.querySelector('.theme-switch');

const setTheme = (theme) => {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  if (themeSwitch) {
    themeSwitch.setAttribute('aria-pressed', String(isDark));
    themeSwitch.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    themeSwitch.title = `Switch to ${isDark ? 'light' : 'dark'} mode`;
    themeSwitch.querySelector('.theme-switch-label').textContent = isDark ? 'DARK' : 'LIGHT';
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#101827' : '#f7f4ed');
  try { localStorage.setItem('mark-cv-theme', isDark ? 'dark' : 'light'); } catch {}
};

setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
themeSwitch?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  themeSwitch.classList.remove('is-pulled');
  void themeSwitch.offsetWidth;
  themeSwitch.classList.add('is-pulled');
  window.setTimeout(() => themeSwitch.classList.remove('is-pulled'), 550);
});

const projectDialog = document.querySelector('#project-dialog');
const projectDialogClose = projectDialog?.querySelector('.project-dialog-close');
const projectTitle = document.querySelector('#project-dialog-title');
const projectKicker = document.querySelector('#project-dialog-kicker');
const projectDescription = document.querySelector('#project-dialog-description');
const projectTags = document.querySelector('#project-dialog-tags');
const projectGallery = document.querySelector('#project-dialog-gallery');
const projectLinkWrap = document.querySelector('#project-dialog-link-wrap');
const projectLink = document.querySelector('#project-dialog-link');
let dialogReturnFocus = null;

const projects = {
  'food-ordering': {
    number: 'PROJECT 002 · DESKTOP SYSTEM',
    title: 'Food Ordering Management System',
    description: 'A desktop system for managing orders from different users and customers. This project focuses on organizing order information in a database-backed interface.',
    stack: ['Java', 'JFrame', 'SQL'],
    galleryMode: 'landscape',
    images: ['food-ordering/food-ordering-1.png', 'food-ordering/food-ordering-2.png', 'food-ordering/food-ordering-3.png', 'food-ordering/food-ordering-4.png'],
  },
  'coffee-shop': {
    number: 'PROJECT 003 · PROMOTIONAL WEBSITE',
    title: 'Coffee Shop Website',
    description: 'A visually engaging website designed to promote and advertise a local coffee shop.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    galleryMode: 'landscape',
    images: ['coffee-site/coffee-site-1.png', 'coffee-site/coffee-site-2.png', 'coffee-site/coffee-site-3.png'],
  },
  tinkernest: {
    number: 'PROJECT 004 · MOBILE SOCIAL PLATFORM',
    title: 'TinkerNest',
    description: 'A mobile platform for communication and social interaction, built with a focus on privacy and data protection.',
    stack: ['Flutter', 'Dart', 'Supabase'],
    galleryMode: 'portrait',
    images: ['tinkernest/tinkernest-1.png', 'tinkernest/tinkernest-2.png'],
  },
  'agrisync-app': {
    number: 'PROJECT 006 · MOBILE APPLICATION',
    title: 'AgriSync App',
    description: 'AgriSync connects local farmers, buyers, and delivery riders with farm-fresh produce and digital solutions. In Panabo City, A.D.A.P.T. AgriSync helps local carinderias and consumers source fresh supplies and reduce food waste through features such as smart batching and digital wallets.',
    stack: ['Flutter', 'Dart', 'Supabase'],
    galleryMode: 'portrait',
    images: ['agrisync-app/agrisync-app-1.png', 'agrisync-app/agrisync-app-2.png', 'agrisync-app/agrisync-app-3.png', 'agrisync-app/agrisync-app-4.png'],
  },
  'agrisync-promo': {
    number: 'PROJECT 005 · PROMOTIONAL WEBSITE',
    title: 'AgriSync Promotional Website',
    description: 'A promotional website for AgriSync, a Panabo City platform connecting local farmers, buyers, and delivery riders. It presents the farm-to-kitchen service and its community-focused approach to fresh supplies and reduced food waste.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    galleryMode: 'landscape',
    images: ['agrisync-promo/promo-1.png', 'agrisync-promo/promo-2.png', 'agrisync-promo/promo-3.png', 'agrisync-promo/promo-4.png'],
    link: 'https://agrisync-blush.vercel.app/',
  },
};

const createProjectGalleryItem = (path, index, title) => {
  const figure = document.createElement('figure');
  const anchor = document.createElement('a');
  const image = document.createElement('img');
  const caption = document.createElement('figcaption');
  const number = document.createElement('span');
  const label = document.createElement('span');
  const source = `assets/projects/${path}`;
  anchor.href = source;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.setAttribute('aria-label', `Open ${title} screenshot ${index + 1} full-size`);
  image.src = source;
  image.alt = `${title} screenshot ${index + 1}`;
  image.loading = 'lazy';
  number.textContent = String(index + 1).padStart(2, '0');
  label.textContent = `SCREEN ${index + 1}`;
  caption.append(number, label);
  anchor.append(image);
  figure.append(anchor, caption);
  return figure;
};

document.querySelectorAll('[data-project-id]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const project = projects[trigger.dataset.projectId];
    if (!project || !projectDialog?.showModal) return;
    dialogReturnFocus = trigger;
    projectKicker.textContent = project.number;
    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;
    projectGallery.classList.toggle('is-portrait', project.galleryMode === 'portrait');
    projectTags.replaceChildren(...project.stack.map((technology) => {
      const tag = document.createElement('li');
      tag.textContent = technology;
      return tag;
    }));
    projectGallery.replaceChildren(...project.images.map((path, index) => createProjectGalleryItem(path, index, project.title)));
    if (project.link) {
      projectLink.href = project.link;
      projectLinkWrap.hidden = false;
    } else {
      projectLink.removeAttribute('href');
      projectLinkWrap.hidden = true;
    }
    projectDialog.showModal();
    projectDialogClose?.focus();
  });
});

projectDialogClose?.addEventListener('click', () => projectDialog.close());
projectDialog?.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
projectDialog?.addEventListener('close', () => {
  dialogReturnFocus?.focus();
  dialogReturnFocus = null;
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = [...document.querySelectorAll('[data-reveal]')];
const sectionLinks = [...document.querySelectorAll('.site-navigation a[href^="#"]:not(.nav-cta)')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

sectionLinks.forEach((link) => link.classList.remove('active'));
if (window.scrollY < 100) sectionLinks.find((link) => link.getAttribute('href') === '#home')?.classList.add('active');

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

let frameRequested = false;
const updateScrollUI = () => {
  if (frameRequested) return;
  frameRequested = true;
  window.requestAnimationFrame(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    frameRequested = false;
  });
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

if ('IntersectionObserver' in window && sections.length) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'location');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach((section) => activeObserver.observe(section));
}

if (menuButton && navigation) {
  const closeNavigation = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeNavigation();
      menuButton.focus();
    }
  });
}
