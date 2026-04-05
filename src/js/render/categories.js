import { refs } from '../refs';
import { state } from '../state';

export function renderCategories(categories) {
  const markup = `
    <li>
      <button
        type="button"
        class="category-btn ${state.currentCategoryId === '' ? 'is-active' : ''}"
        data-category-id=""
      >
        Всі
      </button>
    </li>
    ${categories
      .map(
        category => `
          <li>
            <button
              type="button"
              class="category-btn ${state.currentCategoryId === category._id ? 'is-active' : ''}"
              data-category-id="${category._id}"
            >
              ${category.name}
            </button>
          </li>
        `
      )
      .join('')}
  `;

  refs.categoriesList.innerHTML = markup;
}

export function setActiveCategory(categoryId) {
  document.querySelectorAll('[data-category-id]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.categoryId === categoryId);
  });
}