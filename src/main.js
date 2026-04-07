import './js/feedback';
import { initFilters } from './js/render/filters.js';
import { initGallery } from './js/render/gallery.js';
import './js/render/furniture-detail.js';
// import { initFaqAccordion } from '/js/faq.js';
import { initFurnitureList } from './js/render/furniture-list.js';


initGallery().then(galleryFunctions => {
  initFilters(galleryFunctions.setCategory);
});

document.addEventListener('DOMContentLoaded', () => {
  // initFaqAccordion();
  initFurnitureList();
});
