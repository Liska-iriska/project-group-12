import './js/header.js';
import './js/modals.js';
import { initModals } from './js/modals.js';
import './js/render/feedback.js';
import './js/faq.js';
import { initFilters } from './js/render/filters.js';
import { initGallery } from './js/render/gallery.js';
import './js/render/furniture-detail.js';
import { initFurnitureList } from './js/render/furniture-list.js';


initGallery().then(galleryFunctions => {
  initFilters(galleryFunctions.setCategory);
});

document.addEventListener('DOMContentLoaded', () => {
  initFurnitureList();
});

initModals();
