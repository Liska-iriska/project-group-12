import { initFilters } from "./js/render/filters.js";
import { initGallery } from "./js/render/gallery.js";

initGallery().then(galleryFunctions => {

  initFilters(galleryFunctions.setCategory);
});