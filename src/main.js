import './js/header.js';
import './js/modals.js';
import { initModals } from './js/modals.js';
import './js/render/feedback.js';
import { initFaqAccordion } from './js/faq.js';
import { initFilters } from './js/render/filters.js';
import { initGallery } from './js/render/gallery.js';

initGallery().then(galleryFunctions => {
  initFilters(galleryFunctions.setCategory);
});

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
});

initModals();
