import { en } from '../locales/en.js';
import { pt } from '../locales/pt.js';

const translations = {
  en,
  pt,
};

const STORAGE_KEY = 'portfolio-language';

export function getCurrentLanguage() {
  return localStorage.getItem(STORAGE_KEY) || 'en';
}

export function applyLanguage(language) {
  const dictionary = translations[language] || translations.en;

  document.documentElement.lang = language;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const value = dictionary[key];

    if (value) {
      element.textContent = value;
    }
  });

  const languageSwitch = document.querySelector('.language-switch');

  if (languageSwitch) {
    languageSwitch.textContent =
      language === 'en' ? 'PT' : 'EN';

    languageSwitch.setAttribute(
      'aria-label',
      language === 'en'
        ? 'Mudar idioma para português'
        : 'Switch language to English'
    );
  }

  localStorage.setItem(STORAGE_KEY, language);
}

export function initLanguageSwitcher() {
  let currentLanguage = getCurrentLanguage();

  applyLanguage(currentLanguage);

  const languageSwitch = document.querySelector('.language-switch');

  if (!languageSwitch) return;

  languageSwitch.addEventListener('click', () => {
    currentLanguage =
      currentLanguage === 'en' ? 'pt' : 'en';

    applyLanguage(currentLanguage);
  });
}