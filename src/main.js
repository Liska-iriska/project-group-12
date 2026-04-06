import './js/render/feedback.js';
import { initFilters } from './js/render/filters.js';
import { initGallery } from './js/render/gallery.js';

initGallery().then(galleryFunctions => {
  initFilters(galleryFunctions.setCategory);
});

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
});
