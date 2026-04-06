import { getFurnitures, getCategories } from "./js/api.js";
import { initFilters } from "./js/render/filters.js";
import { initGallery } from "./js/render/gallery.js";
import "./js/faq.js";

initGallery().then(galleryFunctions => {

  initFilters(galleryFunctions.setCategory);
});