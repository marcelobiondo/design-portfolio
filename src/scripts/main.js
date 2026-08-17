const translations = {
  en: {
    'nav.work': 'Work',
    'nav.about': 'About',

    'home.hero.eyebrow': 'Product Design · Leadership · Strategy',
    'home.hero.title': 'I design products, systems and teams.',
    'home.hero.description':
      'Product designer and design leader turning complex problems into simple, meaningful experiences.',
    'home.hero.selectedWork': 'Selected work',

    'home.work.title': 'Selected work',
    'home.work.range': '01—03',

    'home.meutudo.title': 'Designing better financial journeys.',
    'home.meutudo.company': 'meutudo',
    'home.meutudo.meta': 'Staff Product Designer · Fintech',

    'home.meli.title': 'Rethinking returns across Latin America.',
    'home.meli.company': 'Mercado Livre',
    'home.meli.meta': 'UX Lead · Logistics · LATAM',

    'home.facily.title':
      'Redesigning logistics from the operation outward.',
    'home.facily.company': 'Facily',
    'home.facily.meta': 'Product Design Lead · Logistics',

    'home.about.eyebrow': 'About me',
    'home.about.title':
      'Designing digital products and helping teams do their best work.',
    'home.about.p1':
      'I’m a product designer and design leader with experience working across complex digital products, strategy and teams.',
    'home.about.p2':
      'My work lives between understanding the problem, creating clarity and helping people move toward better solutions.',
    'home.about.link': 'More about me ↗',

    'home.footer.eyebrow': 'Let’s talk',
    'home.footer.line1': 'Have a complex problem?',
    'home.footer.line2': "Let's figure it out. ↗",
    'home.footer.email': 'Email',
    'home.footer.linkedin': 'LinkedIn ↗',
  },

  pt: {
    'nav.work': 'Trabalhos',
    'nav.about': 'Sobre',

    'home.hero.eyebrow': 'Product Design · Liderança · Estratégia',
    'home.hero.title': 'Eu projeto produtos, sistemas e times.',
    'home.hero.description':
      'Product Designer e líder de design transformando problemas complexos em experiências simples e relevantes.',
    'home.hero.selectedWork': 'Trabalhos selecionados',

    'home.work.title': 'Trabalhos selecionados',
    'home.work.range': '01—03',

    'home.meutudo.title': 'Criando jornadas financeiras melhores.',
    'home.meutudo.company': 'meutudo',
    'home.meutudo.meta': 'Staff Product Designer · Fintech',

    'home.meli.title':
      'Repensando devoluções em escala latino-americana.',
    'home.meli.company': 'Mercado Livre',
    'home.meli.meta': 'UX Lead · Logística · LATAM',

    'home.facily.title':
      'Redesenhando a logística a partir da operação.',
    'home.facily.company': 'Facily',
    'home.facily.meta': 'Product Design Lead · Logística',

    'home.about.eyebrow': 'Sobre mim',
    'home.about.title':
      'Criando produtos digitais e ajudando times a fazer seu melhor trabalho.',
    'home.about.p1':
      'Sou Product Designer e líder de design com experiência em produtos digitais complexos, estratégia e times.',
    'home.about.p2':
      'Meu trabalho vive entre entender o problema, criar clareza e ajudar pessoas a avançar em direção a soluções melhores.',
    'home.about.link': 'Mais sobre mim ↗',

    'home.footer.eyebrow': 'Vamos conversar',
    'home.footer.line1': 'Tem um problema complexo?',
    'home.footer.line2': 'Vamos descobrir juntos. ↗',
    'home.footer.email': 'Email',
    'home.footer.linkedin': 'LinkedIn ↗',
  },
};

const STORAGE_KEY = 'portfolio-language';

function applyLanguage(language) {
  const dictionary = translations[language];

  if (!dictionary) return;

  document.documentElement.lang = language;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const translation = dictionary[key];

    if (translation !== undefined) {
      element.textContent = translation;
    }
  });

  const languageSwitch = document.querySelector('.language-switch');

  if (languageSwitch) {
    languageSwitch.textContent = language === 'en' ? 'PT' : 'EN';

    languageSwitch.setAttribute(
      'aria-label',
      language === 'en'
        ? 'Mudar idioma para português'
        : 'Switch language to English'
    );
  }

  localStorage.setItem(STORAGE_KEY, language);
}

function initLanguageSwitcher() {
  let currentLanguage =
    localStorage.getItem(STORAGE_KEY) || 'en';

  applyLanguage(currentLanguage);

  const languageSwitch = document.querySelector('.language-switch');

  if (!languageSwitch) {
    console.warn('Language switch button not found.');
    return;
  }

  languageSwitch.addEventListener('click', () => {
    currentLanguage =
      currentLanguage === 'en' ? 'pt' : 'en';

    applyLanguage(currentLanguage);
  });
}

/* ---------------------------------
   Scroll reveal
--------------------------------- */

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => {
      element.classList.add('is-visible');
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/* ---------------------------------
   Init
--------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initScrollReveal();
});