import './js/feedback';
import { initFilters } from './js/render/filters.js';
import { initGallery } from './js/render/gallery.js';
import { initFaqAccordion } from '/js/faq.js';

initGallery().then(galleryFunctions => {
  initFilters(galleryFunctions.setCategory);
});

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
});
