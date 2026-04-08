import './js/header.js';
import './js/render/feedback.js';
import './js/faq.js';
import { initFilters } from './js/render/filters.js';
import { initGallery } from './js/render/gallery.js';
import './js/render/furniture-detail.js';

async function initApp() {
  // Инициализируем галерею и получаем функцию setCategory
  const gallery = await initGallery();

  // Передаем setCategory в фильтры
  initFilters(gallery.setCategory);
}

initApp();